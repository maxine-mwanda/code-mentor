

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