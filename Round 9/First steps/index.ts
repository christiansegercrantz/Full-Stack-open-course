import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

interface requestBody{
  target: number,
  daily_exercises: Array<number>,
}

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
  try{
    const body = req.body as requestBody;
    const target: number = body['target'];
    const exercisePerDay: Array<number> = body['daily_exercises'];
    const exerciesIsNan: boolean = exercisePerDay.some( x => isNaN(x));
    if(isNaN(target) || exerciesIsNan){
      res.status(400).send({error: 'malformatted parameters'});
    }
    res.send(calculateExercises(target, exercisePerDay));
  }
  catch(e){
    res.status(400).send({error: 'parameters missing'});
  }
});

const PORT = 3002;

app.listen( PORT, () => {
  console.log(`Server running at ${PORT}`);
});