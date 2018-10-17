import React, { Component } from 'react';
import axios from 'axios';
import ChatLine from './ChatLine';
import './Chat.css'

export default class Chat extends Component {
  constructor(props){
    super(props)

    this.state = {
      chatInput: '',
      chatContent: [],
    }
  }

  componentWillMount() {
    axios.get(`/poll/retrieveChat/${this.props.pollId}`)
      .then(results => {
        this.setState({
          chatContent: results.data,
        });
      })
      .catch(err => console.warn(err))
    
    const { socket } = this.props
    socket.on('newMessage', (username, message) => {
      let chat = this.state.chatContent;
      chat.push({username, message});
      this.setState({
        chatContent: chat,
      })
    })
    
  }

  inputChange(e) {
    this.setState({
      chatInput: e.target.value,
    })
  }

  submitChat(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.socket.emit('message', this.state.chatInput, this.props.pollCode, this.props.pollId)
  }

  render() {
    const chatLines = this.state.chatContent.map((l, i) => {
      return <ChatLine key={`chatlines${i}`} user={l.username} message={l.message} />
    })
    return (
      <div className="chat-box-componenet">
        <h3>ChatBox</h3>
        <div className="chat-box">
          {chatLines}
        </div>
        <div className="chat-box-form">
          <form onSubmit={(e) => {this.submitChat(e)}}>
            <input value={this.state.chatInput} onChange={(e) => this.inputChange(e)}></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
