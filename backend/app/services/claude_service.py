import os
import json
import httpx
from fastapi import HTTPException

from app.api.models.code_models import CodeAnalysisRequest, AnalysisResponse
from app.core.config import settings

async def analyze_with_claude(request: CodeAnalysisRequest) -> AnalysisResponse:
    """
    Send code to Claude API for analysis and improvement suggestions
    """
    api_key = settings.CLAUDE_API_KEY
    if not api_key:
        raise HTTPException(status_code=500, detail="Claude API key not configured")
    
    # Create a prompt that will get good results from Claude
    prompt = f"""
    I'm a developer working with {request.language}. My experience level is {request.experience_level or 'not specified'}.
    I need help to {request.request_type} the following code:
    
    ```{request.language}
    {request.code}
    ```
    
    Please provide:
    1. An improved version of the code
    2. A clear explanation of the changes made
    3. Specific suggestions for improving the code further
    4. Relevant documentation or resources related to this code
    
    Return your response in JSON format with these keys:
    - improved_code: The improved version of my code
    - explanation: Explanation of changes
    - suggestions: Array of suggestions
    - resources: Array of relevant documentation links
    """
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                },
                json={
                    "model": "claude-3-haiku-20240307",
                    "max_tokens": 1500,
                    "messages": [{"role": "user", "content": prompt}],
                    "response_format": {"type": "json_object"}
                }
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=f"Claude API error: {response.text}")
            
            result = response.json()
            content = result.get("content", [])
            if not content or not isinstance(content, list) or len(content) == 0:
                raise HTTPException(status_code=500, detail="Invalid response from Claude API")
            
            # Parse the response
            response_text = content[0].get("text", "")
            response_data = json.loads(response_text)
            
            return AnalysisResponse(
                original_code=request.code,
                improved_code=response_data.get("improved_code", ""),
                explanation=response_data.get("explanation", ""),
                suggestions=response_data.get("suggestions", []),
                resources=response_data.get("resources", [])
            )
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Claude API: {str(e)}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse Claude API response")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")