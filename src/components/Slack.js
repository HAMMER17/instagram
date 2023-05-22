import React, { useContext, useState } from 'react'
import { addDoc, getFirestore, collection, serverTimestamp } from 'firebase/firestore'
import { app } from '../firebase/fifebase'
import { AuthContext } from '../context/AuthContext'
// import { useDispatch } from 'react-redux'
// import { getData } from '../story/UserStory'
import '../style/sms.css'

const Slack = () => {
  const db = getFirestore(app)
  const { userName } = useContext(AuthContext)

  const [text, setText] = useState('')
  // const [value, setValue] = useState([])
  // const dispatch = useDispatch()

  const sendText = async (e) => {
    e.preventDefault()

    if (text === '') {
      return
    }
    const docRef = await addDoc(collection(db, "messages"), {
      uid: userName.uid,
      user: userName.displayName,
      photo: userName.photoURL,
      message: text,
      createAt: serverTimestamp(),
    });
    // dispatch(getData(value))
    setText('')
    // scroll.current.scrollIntoView({ behavior: 'smooth' })
    console.log("Document written with ID: ", docRef.id);
  }
  return (
    <div className='slack'>
      <form className="sms_input" onSubmit={sendText}>
        <input type="text" placeholder='Message...' value={text}
          onChange={(e) => setText(e.target.value)} />
        <button className='sms_btn'>send</button>
      </form>
    </div>
  )
}

export default Slack
