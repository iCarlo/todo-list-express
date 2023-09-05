import express from 'express';
import http from 'http';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from '../routes';
import connectDB from '../config/db';


export default function createServer() {
  dotenv.config()
  connectDB()

  const app = express();

  app.use(cors({
    credentials: true,
  }))

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Todos API is running...')
  })

  app.use('/api', router());

  const server = http.createServer(app);

  return server;
}

