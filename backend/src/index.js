import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import redis from './queue.js';
import { connectDB } from './db.js';
import socketInit from './socket.js';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

// Initialize Socket.io on the same Express app
const io = socketInit(app);

connectDB();

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }
  const jobId = uuidv4();

  await redis.lpush('uploadQueue', JSON.stringify({
    filePath: req.file.path,
    originalName: req.file.originalname,
    jobId
  }));

  res.json({ jobId });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
