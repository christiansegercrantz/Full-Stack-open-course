import cors from 'cors';
import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';


const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors()); 
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('The backend was pinged');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});