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
        const users = response.data.map(u => u.username)
        this.setState({
          currentUsers: users
        })
      })
      .catch(err => console.warn(err))
  }

  componentDidMount(){
    
    const { socket } = this.props
    socket.on('joined', (user) => {
      if(this.state.currentUsers.indexOf(user) == -1) {
        let users = [...this.state.currentUsers, user];
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
      <div className='participant-box-component'>
          <h3>Participants</h3>
        <div className='chat-box'>
          {current}
        </div>
      </div>
    )
  }
}
