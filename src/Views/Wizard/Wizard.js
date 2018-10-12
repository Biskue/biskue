import React from 'react'
import { Route } from 'react-router-dom'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepFive from './StepFive'
import StepSix from './StepSix'
import StepSeven from './StepSeven'

import './Wizard.css';

export default () => {
  return (
    <div>
      <h1>Create Poll</h1>
      <div className='poll-buttons'>
      <Route path= '/wizard/step-1' component ={StepOne}/>
      <Route path= '/wizard/step-2' component ={StepTwo} />
      <Route path= '/wizard/step-3' component ={StepThree} />
      <Route path= '/wizard/step-4' component ={StepFour} />
      <Route path= '/wizard/step-5' component ={StepFive} />
      <Route path= '/wizard/step-6' component ={StepSix} />
      <Route path= '/wizard/step-7' component ={StepSeven} />
      </div>
    </div>
  )
}
