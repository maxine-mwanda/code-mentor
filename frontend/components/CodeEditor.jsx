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

