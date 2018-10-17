import React from 'react'

const ChatLine = (props) => {
  return (
    <div>
      <span className={'chat-user-name'}>{props.user}:</span> {props.message} <br /> 
    </div>
  )
}

export default ChatLine