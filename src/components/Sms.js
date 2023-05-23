import React, { useContext, useState } from 'react'
import { BsFillBackspaceReverseFill } from 'react-icons/bs'
import { AuthContext } from '../context/AuthContext'
import moment from 'moment';
import '../style/sms2.css'


const Sms = ({ fileImg, show, onShow }) => {
  const { userName } = useContext(AuthContext)

  const [value, setValue] = useState([])
  const [text, setText] = useState('')

  const textSubmit = (e) => {
    e.preventDefault()

    setValue([...value, text])
    setText('')
  }
  const date = moment().format('MMMM Do, h:mm:ss a');
  return (

    <div className={`sms_container ${show}`}>

      <BsFillBackspaceReverseFill style={{ margin: 10 }} size={25} onClick={() => onShow(!show)} />
      <img src={fileImg} alt="s" />
      <span style={{ color: 'white', margin: 5 }}>Comment...</span>
      {value.map(text => (
        <div key={Math.random()} className="textUser" style={{ display: 'flex', margin: 5 }}>
          <img style={{ width: 50, height: 50, borderRadius: 50 }} src={userName.photoURL} alt="ava" />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>

            <h5 style={{ fontStyle: 'italic' }}>{userName.displayName}  </h5>
            <p >{text}</p>
            <span style={{ fontSize: 10 }}>{date}</span>
          </div>

        </div>

      ))}
      <form onSubmit={textSubmit}>
        <input type="text" placeholder='text' onChange={(e) => setText(e.target.value)} value={text} />
        <button>sms</button>
      </form>
    </div>
  )
}

export default Sms
