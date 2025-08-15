import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'; 
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

var app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);

export default app;



