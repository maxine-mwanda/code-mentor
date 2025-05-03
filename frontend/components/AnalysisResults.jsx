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
  