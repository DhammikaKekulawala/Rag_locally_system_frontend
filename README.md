RAG PDF Processor
A professional React frontend for a Retrieval-Augmented Generation (RAG) application that allows users to upload PDF files and ask questions about their content.
Features

PDF upload with drag-and-drop support
Progress bar for file uploads
Question input with processing states
Conversation history display
Responsive design with Tailwind CSS
Modular component structure
PropTypes for type checking

Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation

Clone the repository:git clone <repository-url>
cd rag-pdf-processor


Install dependencies:npm install


Start the development server:npm start



Building for Production
npm run build

Configuration

Replace the simulated API calls in App.jsx and FileUpload.jsx with your backend endpoints.
Update Tailwind CSS configurations in tailwind.config.js if needed.

Project Structure
rag-pdf-processor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx
│   │   ├── QuestionInput.jsx
│   │   └── ResponseDisplay.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md

Dependencies

React 18
Tailwind CSS
PropTypes
Vite (build tool)

Contributing
Contributions are welcome! Please open an issue or submit a pull request.
License
MIT
