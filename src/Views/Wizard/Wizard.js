import React from 'react'
import { Route } from 'react-router-dom'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepFive from './StepFive'
import StepSix from './StepSix'
import StepSeven from './StepSeven'

export default () => {
  return (
    <div>
    <Route path= '/step-1' component ={StepOne}/>>
    <Route path= '/step-2' component ={StepTwo} />
    <Route path= '/step-3' component ={StepThree} />
    <Route path= '/step-4' component ={StepFour} />
    <Route path= '/step-5' component ={StepFive} />
    <Route path= '/step-6' component ={StepSix} />
    <Route path= '/step-7' component ={StepSeven} />
    </div>
  )
}
