import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { onboardingRouter } from './routes/onboarding.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/onboarding', onboardingRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
