interface Meassurements {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = weight / (height/100)**2;
  switch(true){
    case (BMI < 15):
      return 'Very severely underweight';
      case (15 <= BMI && BMI < 16):
        return 'Severely underweight	';
      case (16 <= BMI && BMI < 18.5):
        return 'Underweight';
      case (18.5 <= BMI && BMI < 25):
        return 'Normal (healthy weight)';
      case (25 <= BMI && BMI < 30):
        return 'Overweight';
      case (30 <= BMI && BMI < 35):
        return 'Obese Class I (Moderately obese)';
      case (25 <= BMI && BMI < 40):
        return 'Obese Class II (Severely obese)';
      case (40 <= BMI && BMI):
        return 'Obese Class III (Very severely obese)';
      default:
        throw new Error('Something went wrong with the BMI');
  }
};

export const parseArguments = (args: Array<string>): Meassurements => {
  if (args.length < 4) throw new Error('Too few arguments, you need to provide exactly 2');
  if (args.length > 4) throw new Error('Too many arguments, you need to provide exactly 2');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

