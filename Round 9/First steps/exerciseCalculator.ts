interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number }

export const calculateExercises = (target: number, exercisePerDay: Array<number>): Result => {
  const periodLength: number = exercisePerDay.length;
  const trainingDays: number = exercisePerDay.filter(x => x != 0).length;
  const success: boolean = exercisePerDay.filter(x => x >= target).length == periodLength;
  const average: number = exercisePerDay.reduce((a,b) => a+b)/periodLength;
  const rating: number = average/target <= 0.5 ? 1 : (average/target <= 1 ? 2: 3);
  const ratingOptions: Array<string> = ['Not good enough, you need to work out more', 'not too bad but could be better', 'Good work, you did enough'];
  const ratingDescription: string = ratingOptions[rating-1];
  return {periodLength, trainingDays, success, average, rating, ratingDescription, target};
};

//console.log(calculateExercises(2, [3,0,2,4.5,0,3,1]))

const parseCalcArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Too few arguments, you need to provide at least the target and one day');

  const target = Number(args[2]);
  const tailOfArgs = args.slice(3);
  const exercisePerDay: Array<number> = [];
  tailOfArgs.forEach( x => exercisePerDay.push(Number(x)));

  if (!isNaN(target) && exercisePerDay.every( x => !isNaN(x))) {
    return { target, exercisePerDay };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, exercisePerDay } = parseCalcArguments(process.argv);
  console.log(calculateExercises(target, exercisePerDay));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
