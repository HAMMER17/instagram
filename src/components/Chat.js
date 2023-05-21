import React from 'react'
import '../style/chat.css'

const Chat = ({ text, userPhoto, user, onClick }) => {
  const chatUser = (user) => {
    onClick(user)
  }
  return (
    <div className='chat'>
      <img src={userPhoto} alt="chat" onClick={chatUser} />
      <h3>{user}</h3>
      <ul>
        <li>{text}</li>
      </ul>
    </div>
  )
}

export default Chat
