import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4005/', {
  extraHeaders: { 'Access-Control-Allow-Credentials': 'omit' }
});


export default class LivePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      number: 0,
      pollCode: this.props.match.params.pollCode,
    }

  }

  componentDidMount() {
    var room = this.state.pollCode;
    socket.emit('room', room);
    socket.on('news', data  => {
      this.setState({
        response: data,
      })
      console.log(data);
      socket.send('hi');

      socket.on('incremented', (number) => {
      this.setState({
        number
      })
    });

  });
  }

  increment() {
    socket.emit('increment', this.state.number, this.state.pollCode)
  }

  render() {
    return (
      <div>
        Hello 
        {this.state.response.hello}
        <button
          onClick={() =>this.increment() }>Increment Socket</button>
        {this.state.number}
      </div>
    )
  }
}
