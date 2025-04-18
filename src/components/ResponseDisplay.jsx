import PropTypes from 'prop-types';

// Component for displaying question-answer history
const ResponseDisplay = ({ responses }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conversation History</h2>
      {responses.length === 0 ? (
        <p className="text-gray-500">No questions asked yet. Upload a PDF and start asking!</p>
      ) : (
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Q: {response.question}</p>
              <p className="text-gray-600 mt-2">A: {response.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ResponseDisplay.propTypes = {
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ResponseDisplay;