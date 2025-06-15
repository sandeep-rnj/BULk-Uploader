import React from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001');

function Upload({ onProgress, onStatus }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post('/upload', formData, {
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
    });

    const { jobId } = data;
    socket.emit('join', jobId);
    socket.on('progress', ({ percent }) => onProgress({ percent }));
    socket.on('complete', () => onStatus('complete'));
    socket.on('error', (err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block">
        <span className="sr-only">Choose CSV</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </label>
    </div>
  );
}

export default Upload;
