import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

export default function (expressApp) {
  const server = http.createServer(expressApp);
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  const SOCKET_PORT = process.env.SOCKET_PORT || 5001;
  server.listen(SOCKET_PORT, () => console.log(`Socket.io server on ${SOCKET_PORT}`));

  io.on('connection', socket => {
    socket.on('join', jobId => socket.join(jobId));
  });

  // expose io for other modules
  expressApp.set('io', io);
  return io;
}
