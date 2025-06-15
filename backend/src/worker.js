import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import Redis from './queue.js';
import { connectDB } from './db.js';
import Record from './models/Record.js';
import { Server } from 'socket.io';

dotenv.config();

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '500', 10);
const io = new Server(parseInt(process.env.WORKER_SOCKET_PORT || '5001', 10), {
  cors: { origin: '*' }
});

await connectDB();

console.log('Worker listening for jobs...');

while (true) {
  const res = await Redis.brpop('uploadQueue', 0); // block until job
  const job = JSON.parse(res[1]);
  await handleJob(job).catch(err => {
    console.error('Job failed:', err);
    io.to(job.jobId).emit('error', { message: err.message });
  });
}

async function handleJob({ filePath, jobId }) {
  const totalLines = await countLines(filePath) - 1;
  let processed = 0;
  let batch = [];

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const record of stream) {
    batch.push({ data: record });
    if (batch.length === BATCH_SIZE) {
      await Record.insertMany(batch);
      processed += batch.length;
      batch = [];
      emitProgress(jobId, processed, totalLines);
    }
  }
  // leftovers
  if (batch.length) {
    await Record.insertMany(batch);
    processed += batch.length;
    emitProgress(jobId, processed, totalLines);
  }

  emitProgress(jobId, totalLines, totalLines); // 100%
  io.to(jobId).emit('complete');
  fs.unlinkSync(filePath);
}

function emitProgress(jobId, processed, total) {
  const percent = Math.round((processed / total) * 100);
  io.to(jobId).emit('progress', { percent });
}

function countLines(path) {
  return new Promise((resolve) => {
    let count = 0;
    fs.createReadStream(path)
      .on('data', chunk => {
        for (let i = 0; i < chunk.length; ++i) {
          if (chunk[i] === 10) count++; // newline
        }
      })
      .on('end', () => resolve(count));
  });
}
