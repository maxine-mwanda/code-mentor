from fastapi import HTTPException, status

class CodeMentorException(HTTPException):
    """Base exception class for Code Mentor API"""
    def __init__(
        self,
        status_code: int,
        detail: str = None,
    ):
        super().__init__(status_code=status_code, detail=detail)

class APIConnectionError(CodeMentorException):
    """Exception raised when connection to external API fails"""
    def __init__(self, api_name: str, detail: str = None):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Could not connect to {api_name} API: {detail}"
        )

class InvalidInputError(CodeMentorException):
    """Exception raised when input validation fails"""
    def __init__(self, detail: str = "Invalid input"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )

class AIResponseError(CodeMentorException):
    """Exception raised when AI response is invalid or cannot be processed"""
    def __init__(self, detail: str = "Invalid AI response"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail
        )