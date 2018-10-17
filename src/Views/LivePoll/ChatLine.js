import React from 'react'

const ChatLine = (props) => {
  return (
    <div>
      {props.user}: {props.message} <br /> 
    </div>
  )
}

export default ChatLine