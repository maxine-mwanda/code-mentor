A full-stack application that helps developers improve their code by providing real-time code reviews, refactoring suggestions, bug identification, and best practice recommendations powered by AI.
Features

🧠 AI-powered code analysis and improvement suggestions
💻 Support for multiple programming languages
🔄 Different analysis types (refactoring, debugging, optimization, explanation)
📝 Detailed explanations of suggested improvements
📚 Relevant resources and documentation links
📜 Query history tracking

Tech Stack

Backend: Python with FastAPI
Frontend: Next.js with TailwindCSS
AI Integration: Claude API (free tier)

Prerequisites

Python 3.8+
Node.js 16+ and npm
Claude API key (free tier)

Setup Instructions
Backend Setup

Clone the repository and navigate to the project directory:
bashgit clone https://github.com/yourusername/code-mentor.git
cd code-mentor-ai/backend

Create and activate a virtual environment:
bashpython -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

Install the required dependencies:
bashpip install -r requirements.txt

Create a .env file in the backend directory with your Claude API key:
CLAUDE_API_KEY=your_claude_api_key_here

Start the FastAPI server:
bashuvicorn main:app --reload
The backend API will be available at http://localhost:8000. You can access the API documentation at http://localhost:8000/docs.

Frontend Setup

Navigate to the frontend directory:
bashcd ../frontend

Install the required dependencies:
bashnpm install

Start the Next.js development server:
bashnpm run dev
The frontend will be available at http://localhost:3000.

Usage

Open your browser and go to http://localhost:3000
Enter your code in the editor
Select the programming language
Choose the type of analysis you want (refactor, debug, optimize, or explain)
Select your experience level
Click "Analyze Code" to get AI-powered suggestions
View your query history by clicking "Show History"

API Endpoints

POST /api/analyze - Submit code for AI analysis
GET /api/history - Get query history
POST /api/analyze/mock - Mock endpoint for testing without Claude API

Environment Variables
Backend

CLAUDE_API_KEY - Your Claude API key

Development
Testing the Backend
You can test the backend API without using the Claude API by using the mock endpoint:
bashcurl -X 'POST' \
  'http://localhost:8000/api/analyze/mock' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
  "language": "python",
  "experience_level": "intermediate",
  "request_type": "optimize"
}'
Building for Production
Backend
bash# No special build steps for FastAPI, just ensure your environment variables are set correctly
Frontend
bashcd frontend
npm run build
npm run start
