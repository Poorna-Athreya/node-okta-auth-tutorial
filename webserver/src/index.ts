import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { oktaAuthRequired } from './lib/oktaAuthRequired';

dotenv.config({
  path: '.env',
});

const app: Express = express();
const PORT = process.env.APP_PORT as string || "8000";

app.use(cors());

app.get('/api/locked', oktaAuthRequired, (req: Request, res: Response) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'I AM LEGEND',
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'BEEP BOOP BEEP BOOP!',
      },
    ],
  });
});

app.get('/api/free', (req: Request, res: Response) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'HAHAHAHAHA YOU THOT YOU COULD LOCK ME UP',
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`We LIVE at http://localhost:${PORT}`);
});
