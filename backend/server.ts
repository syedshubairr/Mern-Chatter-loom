import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {ConnectDB} from './config/Database';
import userRouter from './routes/userRoutes';
import {errorHandler, notFound} from './middleware/errorMiddleware';
import chatRouter from './routes/chatRoutes';

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json({limit: '3mb'})); // this is will the app to use JSON request.
app.use(express.urlencoded({limit: '3mb', extended: false}));
ConnectDB();
app.get('/', (req, res) => {
  res.send('Backend Running');
});

app.use('/user', userRouter);
app.use('/chat', chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  return console.log(
    `ChatterLoom-Backend is listening at http://localhost:${port}`,
  );
});
