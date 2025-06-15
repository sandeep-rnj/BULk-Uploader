import React, { useState } from 'react';
import Upload from './components/Upload';
import ProgressBar from './components/ProgressBar';
import Report from './components/Report';

function App() {
  const [progress, setProgress] = useState(null);
  const [status, setStatus] = useState(null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Bulk Data Uploader</h1>
      <Upload onProgress={setProgress} onStatus={setStatus} />
      {progress && <ProgressBar percent={progress.percent} />}
      {status === 'complete' && <p className="mt-4 text-green-600">Processing complete!</p>}
    </div>
  );
}

export default App;
