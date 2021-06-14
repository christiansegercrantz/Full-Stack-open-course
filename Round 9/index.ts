/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

/*interface BMIRes{
  weight: number,
  height: number,
  BMI: string
}*/

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) && isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  res.json({weight,height,bmi});
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  const target: number = req.body['target'];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercisePerDay: Array<number> = req.body['daily_exercises'];
  res.send(calculateExercises(target, exercisePerDay));
});

const PORT = 3002;

app.listen( PORT, () => {
  console.log(`Server running at ${PORT}`);
});