import React, { Component } from 'react'
import axios from 'axios'

export default class Winner extends Component {
  constructor(props){
    super(props)
    this.state ={
      winner: {}
    }
  }
  componentWillMount(){
    axios.get(`/poll/retrieve/${this.props.match.params.pollCode}`).then((response)=>{
      this.setState({winner: response.data[0].pollWinner})
    })
  }
  render() {
    return (
      <div>
        {this.state.winner.name}
      </div>
    )
  }
}
