import React from 'react';

import { CoursePart } from '../types';

const Total =({parts}: {parts: CoursePart[]}): JSX.Element => {

  const totalNumOfExercies = parts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return(
      <p>
        Number of exercises {totalNumOfExercies}
      </p>
  )
}

export default Total