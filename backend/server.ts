import express from 'express';
import 'dotenv/config';
import {chats} from './data/data';
import cors from 'cors';
const app = express();
const port = process.env.PORT;
app.use(cors());
app.get('/', (req, res) => {
  res.send('Backend Running');
});

app.get('/chat', (req, res) => {
  res.send(chats);
});

app.get('/chat/:id', (req, res) => {
  console.log(req.params.id);
  const singleChat = chats.find(chat => chat._id === req.params.id);
  res.send(singleChat);
});

app.listen(port, () => {
  return console.log(`Backend is listening at http://localhost:${port}`);
});
