import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FileUpload from './components/FileUpload';
import QuestionInput from './components/QuestionInput';
import ResponseDisplay from './components/ResponseDisplay';

// Main App component orchestrating the RAG PDF Processor UI
const App = () => {
  const [responses, setResponses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle successful PDF upload
  const handleUploadSuccess = useCallback((message) => {
    // Replace with toast notification or state update
    // eslint-disable-next-line no-alert
    alert(message);
  }, []);

  // Handle question submission
  const handleAskQuestion = useCallback(async (question) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.answer) {
        throw new Error('Invalid response format from server');
      }

      setResponses((prev) => [...prev, { question, answer: data.answer }]);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`Error processing question: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">RAG PDF Processor</h1>
        <p className="text-gray-600 mt-2">
          Upload PDFs and ask questions about their content
        </p>
      </header>
      <main className="w-full flex flex-col items-center gap-8">
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <QuestionInput onAskQuestion={handleAskQuestion} isProcessing={isProcessing} />
        <ResponseDisplay responses={responses} />
      </main>
    </div>
  );
};

App.propTypes = {
  // No props for App, but included for consistency
};

export default App;