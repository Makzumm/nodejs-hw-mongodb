import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import contactsRoutes from './routes/contactsRoutes.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(process.env.PORT);

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use( 
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRoutes);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
