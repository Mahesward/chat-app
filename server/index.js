import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import connection from './configs/mongodbConnection.js';
import authRoute from './routes/authRoutes.js';
import conversationRoute from './routes/conversation.js';
import messageRoute from './routes/message.js';

const app = express();
dotenv.config();

/*
 *connect mongodb
 */
connection();

/*
 *Use Middlewares
 */
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

/*
 *API Routes]
 */
app.use('/api/auth', authRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

/*
 *Start Server
 */

app.use((req, res) => {
  res.send('Hey thats a 404');
});

/*
 * Socket.IO
 */

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);
  });

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined in room ${data}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`Server Started on http://localhost:${port}`));
