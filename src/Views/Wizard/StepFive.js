import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import uniqid from 'uniqid'
import * as Actions from '../../Redux/Actions/actions';

import './StepFive.css';

class StepFive extends Component {
  constructor(props){
    super(props)
    this.state = {
      numberOfVotes: 1,
      allowDownVotes: true,
      allowChat: true,
      
    }
  }
  componentWillMount(){
    if(!this.props.PollItems){
      this.props.history.push('/wizard/step-1')
    }
  }
  handleChange(name){
    if(this.state[name]=== true){
      this.setState({[name]: false})
    }else{
      this.setState({[name]: true})
    }
  }
  handleVotesChange(number){
    this.setState({numberOfVotes: Number(number)})
  }
  createPoll(){
    const url= 'http://localhost:3000/poll/'
    const randomString= uniqid()
    const pollSettings ={
      pollCode: randomString,
      pollURL: url + randomString,
      votesPerUser: this.state.numberOfVotes,
      allowDownVotes: this.state.allowDownVotes,
      isActive: true,
      allowChat: this.state.allowChat,
      pollOptions: this.props.PollItems,
      

    }
    console.log(pollSettings)
    this.props.saveStepFive(url+randomString, randomString)
    axios.post('/poll/createPoll', pollSettings).then(()=> {
      this.props.history.push('/wizard/step-6')
    })
  }
  render() {
    return (
      <div className='step-four slide-in-fwd-right'>
        <h2>POLL SETTINGS (STEP 5 of 5)</h2>
        <div className='next'>
          <Link to='/wizard/step-4'>
          <button>&larr;</button>
          </Link>
          <button onClick={()=> this.createPoll()} id='done-button'>Done</button>
        </div>

        {/* <div classname='step-header'>
          <h2>Select Poll Settings</h2>
          <h4>(Step 5 of 5)</h4>
        </div> */}
        
        <div className='options-box'>
          <div className='user-votes'>
            <label>Votes Per User</label>
            <div className='select'>
            <select onChange={(e)=> this.handleVotesChange(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <div className="select__arrow"></div>
          </div>
          </div>

          <div className='inputGroup'>
          <input type="checkbox" checked={this.state.allowDownVotes} onChange={()=>this.handleChange('allowDownVotes')}/>
          <label > Allow Down Votes</label>
          </div>

          <div className='inputGroup'>
          <input type="checkbox" checked={this.state.allowChat} onChange={()=>this.handleChange('allowChat')}/>
          <label>Allow Chat</label>
          </div>

        </div>

      </div>
    )
  }
}
export default connect(state=> state, Actions)(StepFive)