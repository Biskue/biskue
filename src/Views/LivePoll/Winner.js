import React, { Component } from 'react'
import axios from 'axios'
import RestaurantCard from '../Wizard/RestaurantCard'

export default class Winner extends Component {
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
    const loading = this.state.loading ? "Loading..." : <RestaurantCard currentRes={this.state.winner}/>
    return (
      <div>
        <h1>And the Winner is...</h1>
        {loading}
      </div>
    )
  }
}
