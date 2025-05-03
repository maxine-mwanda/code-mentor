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
  