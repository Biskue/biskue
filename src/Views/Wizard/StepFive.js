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
      <div className='step-four'>
        <h2>POLL SETTINGS (STEP 5 of 5)</h2>
        <div className='next'>
        <Link to='/wizard/step-4'>
          <button id="next-button" >back</button>
          </Link>
          <div></div>
          </div>
          <div className='step-five'>
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
          <input id='allow-down-votes' type="checkbox" checked={this.state.allowDownVotes} onChange={()=>this.handleChange('allowDownVotes')}/>
          <label htmlFor='allow-down-votes'> Allow Down Votes</label>
        </div>
        <div className='inputGroup' >               
          <input id='allow-chat' type="checkbox" checked={this.state.allowChat} onChange={()=>this.handleChange('allowChat')}/>
          <label htmlFor='allow-chat' >Allow Chat</label>
          </div>   
        </div>
        <div>
         
          <button id="next-button" onClick={()=> this.createPoll()}>Done</button>
        </div>
      </div>
    )
  }
}
export default connect(state=> state, Actions)(StepFive)