from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Code Mentor AI"
    PROJECT_DESCRIPTION: str = "AI-powered code improvement suggestions"
    
    # Claude API settings
    CLAUDE_API_KEY: str
    
    # CORS settings
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()