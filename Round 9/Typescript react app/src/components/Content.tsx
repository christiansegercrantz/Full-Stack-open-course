import React from 'react';

import {CoursePart} from '../types'
import Part from './Part';


const Content = ({parts}: {parts: CoursePart[]}): JSX.Element => {

  const partsParagrafs = parts.map((p,i) => <Part key = {i} part = {p} />) 

  return(
    <div>
      {partsParagrafs}
    </div>
  )
}

export default Content