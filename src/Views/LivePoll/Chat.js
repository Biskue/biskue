import React, { Component } from 'react'
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
    const { socket } = this.props
    socket.on('newMessage', (user, message) => {
      let chat = this.state.chatContent;
      chat.push({user, message});
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

    this.props.socket.emit('message', this.state.chatInput, this.props.pollCode)
  }

  render() {
    const chatLines = this.state.chatContent.map((l, i) => {
      return <ChatLine key={`chatlines${i}`} user={l.user} message={l.message} />
    })
    return (
      <div className="chat-box-componenet">
        ChatBox
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
