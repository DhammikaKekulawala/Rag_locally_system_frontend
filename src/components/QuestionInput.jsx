import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Component for handling question input and submission
const QuestionInput = ({ onAskQuestion, isProcessing }) => {
  const [question, setQuestion] = useState('');

  // Handle question submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (question.trim()) {
        onAskQuestion(question);
        setQuestion('');
      }
    },
    [question, onAskQuestion]
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the uploaded PDF..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          onClick={handleSubmit}
          disabled={isProcessing || !question.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

QuestionInput.propTypes = {
  onAskQuestion: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default QuestionInput;