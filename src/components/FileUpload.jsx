import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Component for handling PDF file upload with drag-and-drop
const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection via input
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  }, []);

  // Handle drag-over event
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag-leave event
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please drop a valid PDF file');
    }
  }, []);

  // Handle file upload
  const handleUpload = useCallback(async () => {
    if (!file) return;

    setProgress(0);
    const formData = new FormData();
    formData.append('file', file); // Changed from 'pdf' to 'file' to match FastAPI endpoint

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.message) {
        throw new Error('Invalid response format from server');
      }

      onUploadSuccess(data.message);
      setFile(null);
      setProgress(0);
    } catch (err) {
      setError(`Failed to upload PDF: ${err.message}`);
      setProgress(0);
    }
  }, [file, onUploadSuccess]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
        >
          {file ? file.name : 'Drag & drop PDF or click to select'}
        </label>
      </div>
      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      {file && (
        <div className="mt-4 space-y-3">
          <button
            onClick={handleUpload}
            disabled={progress > 0 && progress < 100}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Upload PDF
          </button>
          {progress > 0 && (
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{progress}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
};

export default FileUpload;