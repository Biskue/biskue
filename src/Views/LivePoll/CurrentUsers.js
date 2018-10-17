import React, { Component } from 'react'
import axios from 'axios';

export default class CurrentUsers extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUsers: [],
    }
  }

  componentWillMount() {
    axios.get(`/poll/retrieveUsers/${this.props.pollCode}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          currentUsers: [...response.data.participants]
        })
      })
      .catch(err => console.warn(err))
    const { socket } = this.props
    socket.on('joined', (user) => {
      if(this.state.currentUsers.indexOf(user) == -1) {
        let users = [...this.state.currentUsers, user];
        console.log(user, users);
        this.setState({
          currentUsers: users,
        })
      }
    })
    
  }

  render() {
    const current = this.state.currentUsers.map((user, i) => {
      return(<div key={`user-${i}`}>
        {user}
      </div>)
    })
    return(
      <div className='chat-box'>
        Participants:
        {current}
      </div>
    )
  }
}
