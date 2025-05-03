// components/CodeEditor.jsx
import { useEffect, useRef } from 'react';

const CodeEditor = ({ code, onChange, language }) => {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea based on content
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);
  
  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };
  
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <span className="font-mono text-sm font-medium text-gray-600">{language}</span>
        <span className="text-xs text-gray-500">{code.split('\n').length} lines</span>
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-4 font-mono text-sm min-h-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={`Enter your ${language} code here...`}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;

// components/AnalysisResults.jsx
const AnalysisResults = ({ results, language }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Improved Code</h3>
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
          {results.improved_code}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Explanation</h3>
        <div className="bg-white border border-gray-300 rounded-md p-4 text-sm whitespace-pre-wrap">
          {results.explanation}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Suggestions</h3>
        <ul className="list-disc list-inside bg-white border border-gray-300 rounded-md p-4 space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm">{suggestion}</li>
          ))}
        </ul>
      </div>
      
      {results.resources.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Resources</h3>
          <ul className="list-disc list-inside bg-white border border-gray-300 rounded-md p-4 space-y-2">
            {results.resources.map((resource, index) => (
              <li key={index} className="text-sm">
                {resource.startsWith('http') ? (
                  <a 
                    href={resource} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {resource}
                  </a>
                ) : (
                  resource
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;

// components/LanguageSelector.jsx
const LanguageSelector = ({ value, onChange }) => {
  const languages = [
    'python', 'javascript', 'typescript', 'java', 'c', 'cpp', 'csharp',
    'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'sql'
  ];

  return (
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Language
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

// components/RequestTypeSelector.jsx
const RequestTypeSelector = ({ value, onChange }) => {
  const requestTypes = [
    { value: 'refactor', label: 'Refactor Code' },
    { value: 'debug', label: 'Debug Issues' },
    { value: 'optimize', label: 'Optimize Performance' },
    { value: 'explain', label: 'Explain Code' }
  ];

  return (
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Request Type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {requestTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RequestTypeSelector;

// components/QueryHistory.jsx
const QueryHistory = ({ history, onItemClick }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No query history available
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {history.map((item) => (
        <div 
          key={item.id}
          onClick={() => onItemClick(item)}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm text-indigo-600">
              {item.request.language.charAt(0).toUpperCase() + item.request.language.slice(1)} - {item.request.request_type}
            </span>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="bg-gray-100 p-2 rounded font-mono text-xs line-clamp-3 whitespace-pre-wrap">
            {item.request.code.substring(0, 150)}
            {item.request.code.length > 150 ? '...' : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueryHistory;