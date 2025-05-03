from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid

from app.api.models.code_models import CodeAnalysisRequest, AnalysisResponse, QueryHistoryItem
from app.services.claude_service import analyze_with_claude

router = APIRouter()

# In-memory storage for query history (in production, use a database)
query_history = []

@router.post("/analyze", response_model=AnalysisResponse, 
          summary="Analyze and improve code",
          description="Submits code to the AI for analysis and improvement suggestions")
async def analyze_code(request: CodeAnalysisRequest):
    # Validate request
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")
    if not request.language.strip():
        raise HTTPException(status_code=400, detail="Language must be specified")
    if request.request_type not in ["refactor", "debug", "optimize", "explain"]:
        raise HTTPException(status_code=400, detail="Invalid request type")
    
    # Process with AI
    response = await analyze_with_claude(request)
    
    # Store in history
    history_item = QueryHistoryItem(
        id=str(uuid.uuid4()),
        request=request,
        response=response
    )
    query_history.append(history_item)
    
    return response

@router.get("/history", response_model=List[QueryHistoryItem],
         summary="Get query history",
         description="Retrieves the history of code analysis queries")
async def get_history():
    return query_history

@router.post("/analyze/mock", response_model=AnalysisResponse, 
         summary="Mock code analysis",
         description="Mock endpoint for testing without using the Claude API")
async def analyze_code_mock(request: CodeAnalysisRequest):
    """Mock endpoint for testing without using the Claude API"""
    return AnalysisResponse(
        original_code=request.code,
        improved_code="def factorial(n):\n    if n < 0:\n        raise ValueError(\"Input must be non-negative\")\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result",
        explanation="The improved code uses an iterative approach instead of recursion to avoid stack overflow for large inputs. It also adds input validation.",
        suggestions=["Add type hints for better code readability", "Consider using math.factorial from the standard library for production code"],
        resources=["https://docs.python.org/3/library/math.html#math.factorial", "https://realpython.com/python-recursion/"]
    )