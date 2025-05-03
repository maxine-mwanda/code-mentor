from pydantic import BaseModel, Field
from typing import Optional, List

class CodeAnalysisRequest(BaseModel):
    code: str = Field(..., description="Code snippet to analyze")
    language: str = Field(..., description="Programming language of the code")
    experience_level: Optional[str] = Field(None, description="User's experience level")
    request_type: str = Field(..., description="Type of analysis (refactor/debug/optimize)")
    
    class Config:
        schema_extra = {
            "example": {
                "code": "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
                "language": "python",
                "experience_level": "intermediate",
                "request_type": "optimize"
            }
        }

class AnalysisResponse(BaseModel):
    original_code: str
    improved_code: str
    explanation: str
    suggestions: List[str]
    resources: List[str]

class QueryHistoryItem(BaseModel):
    id: str
    request: CodeAnalysisRequest
    response: AnalysisResponse