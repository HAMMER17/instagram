import React, { useContext, useState } from 'react'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { BsFillBackspaceReverseFill } from 'react-icons/bs'
import { AuthContext } from '../context/AuthContext'
import moment from 'moment';
import '../style/sms2.css'
import { app } from '../firebase/fifebase';

const db = getFirestore(app)
const Sms = ({ fileImg, show, onShow, value = [], test }) => {
  const { userName } = useContext(AuthContext)
  const date = moment().format('MMMM Do, h:mm:ss a');

  const [text, setText] = useState('')

  const textSubmit = async (e) => {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "userChat"), {
      test,
      url: userName.photoURL,
      name: userName.displayName,
      text: text,
      time: date,
    });
    console.log("Document written with ID: ", docRef.id);
    // setValue([...value, text])
    setText('')
  }

  return (
    <div className={`sms_container ${show}`}>
      <BsFillBackspaceReverseFill style={{ margin: 10, position: 'fixed', color: 'red', cursor: 'pointer' }} size={25} onClick={() => onShow(!show)} />
      <img src={fileImg} alt="s" />
      <span style={{ color: 'white', margin: 5 }}>Comment...</span>
      {value.map(item => (
        <div key={Math.random()} className="textUser" style={{ display: 'flex', margin: 5 }}>
          <img style={{ width: 50, height: 50, borderRadius: 50 }} src={item.url} alt="ava" />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>

            <h5 style={{ fontStyle: 'italic' }}>{item.name}  </h5>
            <p >{item.text}</p>
            <span style={{ fontSize: 10 }}>{item.time}</span>
          </div>

        </div>

      ))}
      <form onSubmit={textSubmit} className='sms_submit'>
        <input type="text" placeholder='Text...' onChange={(e) => setText(e.target.value)} value={text} />
        <button>Comment</button>
      </form>
    </div>
  )
}

export default Sms
