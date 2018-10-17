import React, { Component } from 'react'

export default class Chat extends Component {
  constructor(props){
    super(props)

    this.state = {
      chatInput: '',
      chatContent: [],
    }
  }

  componentDidMount() {
    const { socket } = this.props
    socket.on('newMessage', (user, message) => {
      console.log(user, message);
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
    return (
      <div className="chat-box-componenet">
        ChatBox Component
        {console.log(this.state.chatContent)}
        <div className="chat-box">
          {this.props.pollCode}
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
