import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import uniqid from 'uniqid'
import {connect} from 'react-redux'
import * as Actions from '../../Redux/Actions/actions';

class StepFive extends Component {
  constructor(props){
    super(props)
    this.state = {
      numberOfVotes: 1,
      allowDownVotes: true,
      allowChat: true,
      
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
      <div>
        <h1>Select Poll Settings</h1>
        <div>
          <select onChange={(e)=> this.handleVotesChange(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <label>Number of votes per user</label>
          <div>
          <input type="checkbox" checked={this.state.allowDownVotes} onChange={()=>this.handleChange('allowDownVotes')}/>
          <label > Allow Down Votes</label>
        </div>
        <div>               
          <input type="checkbox" checked={this.state.allowChat} onChange={()=>this.handleChange('allowChat')}/>
          <label>Allow Chat</label>
          </div>   
        </div>
        <div>
          <Link to='/wizard/step-4'>
          <button>back</button>
          </Link>
          <button onClick={()=> this.createPoll()}>Done</button>
        </div>
      </div>
    )
  }
}
export default connect(state=> state, Actions)(StepFive)