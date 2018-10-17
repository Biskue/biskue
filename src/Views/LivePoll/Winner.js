import React, { Component } from 'react'
import axios from 'axios'
import RestaurantCard from '../Wizard/RestaurantCard'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../Redux/Actions/actions'

class Winner extends Component {
  constructor(props){
    super(props)
    this.state ={
      winner: {},
      loading: true
    }
  }
  componentWillMount(){
    axios.get(`/poll/retrieve/${this.props.match.params.pollCode}`).then((response)=>{
      this.setState({winner: response.data[0].pollWinner, loading: false})
    })
  }
  render() {
    const loading = this.state.loading ? "Loading..." : <RestaurantCard animate={true} currentRes={this.state.winner}/>
    return (
      <div>
        <h1>And the Winner is...</h1>
        <div className='winner-container'>
        {loading}
        </div>
        <div className='winner-container'>
          <Link to='/wizard/step-1'>
          <button >New Poll</button>
          </Link>
          <Link to='/'>
          <button > Back to Home Page</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default connect(state=> state, Actions)(Winner)
