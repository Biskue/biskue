import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import axios from 'axios'

 class StepThree extends Component {
   constructor(props){
    super(props)
    this.state = {

    }
   }
   componentWillMount(){
     axios.get()
   }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
export default connect(state => state, Actions)(StepThree)