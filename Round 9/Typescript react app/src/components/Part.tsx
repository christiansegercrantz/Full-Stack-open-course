import React from 'react';

import {CoursePart} from '../types'

const Part = ({part}: {part : CoursePart}) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(part.type){
    case 'normal':
      return(
        <div>
          <b>{part.name} {part.exerciseCount}</b> <br/>
          <i>{part.description}</i>
        </div>
      )
    case 'groupProject':
      return(
        <div>
          <b>{part.name} {part.exerciseCount}</b><br/>
          project exercises {part.groupProjectCount}
        </div>
      )
    case 'submission':
      return(
        <div>
          <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i><br/>
          Submit to {part.exerciseSubmissionLink}
        </div>
      )
    case 'special':
      return(
        <div>
          <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i><br/>
          Requires skills: {part.requirements.map( s => s + " ")}
        </div>
      )
    default:
      assertNever(part)
  }

  return(
    <div>

    </div>
  )
}

export default Part