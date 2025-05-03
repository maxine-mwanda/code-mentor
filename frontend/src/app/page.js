// app/page.js - Main page component
'use client';

import { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import AnalysisResults from '@/components/AnalysisResults';
import LanguageSelector from '@/components/LanguageSelector';
import RequestTypeSelector from '@/components/RequestTypeSelector';
import QueryHistory from '@/components/QueryHistory';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [requestType, setRequestType] = useState('refactor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load query history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/history');
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };
    
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          experience_level: experienceLevel,
          request_type: requestType,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze code');
      }
      
      const data = await response.json();
      setResults(data);
      
      // Update history locally
      setHistory(prev => [
        {
          id: Date.now().toString(),
          request: {
            code,
            language,
            experience_level: experienceLevel,
            request_type: requestType,
          },
          response: data
        },
        ...prev
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setCode(item.request.code);
    setLanguage(item.request.language);
    setExperienceLevel(item.request.experience_level || 'intermediate');
    setRequestType(item.request.request_type);
    setResults(item.response);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Code Mentor AI</h1>
          <p className="text-indigo-200 mt-2">Get AI-powered suggestions to improve your code</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Panel */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Your Code</h2>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-200 transition-colors"
                >
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>
              
              {showHistory ? (
                <QueryHistory history={history} onItemClick={handleHistoryItemClick} />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-4 mb-4">
                    <LanguageSelector value={language} onChange={setLanguage} />
                    <RequestTypeSelector value={requestType} onChange={setRequestType} />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <CodeEditor code={code} onChange={setCode} language={language} />
                  
                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className={`w-full mt-4 py-3 px-6 rounded-md font-medium text-white 
                      ${loading || !code.trim() 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 transition-colors'}`}
                  >
                    {loading ? 'Analyzing...' : 'Analyze Code'}
                  </button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
          
          {/* Results Panel */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Results</h2>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Analyzing your code...</p>
                </div>
              ) : results ? (
                <AnalysisResults results={results} language={language} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="mt-4">Submit your code for AI analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Code Mentor AI - Powered by FastAPI, Next.js, and Claude AI</p>
        </div>
      </footer>
    </div>
  );
}