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