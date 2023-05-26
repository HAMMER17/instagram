import React, { useContext, useState, useEffect } from 'react'
import { getFirestore, query, collection, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore'
import { app } from '../firebase/fifebase'
import Slack from '../components/Slack'
import { AuthContext } from '../context/AuthContext'
import { BsFillBackspaceFill } from 'react-icons/bs'
import '../style/messages.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Messages = () => {
  const [item, setItem] = useState([])
  const [text, setText] = useState([])

  const navigate = useNavigate()
  // const ref = useRef()
  const { userName } = useContext(AuthContext)
  const state = useSelector(state => state.user.value)

  const db = getFirestore(app)

  const getUser = async () => {
    const q = query(collection(db, "users"), where("name", "==", state));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItem(doc.data());
    });
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy('createAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setText(arr)
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="messages_container">
        <div className='messages'>
          <BsFillBackspaceFill size={25} onClick={() => navigate('/')} style={{ color: 'white', margin: 10, cursor: 'pointer' }} />
          <div className="messages_img">

            <img src={item.photo} alt="user" onClick={() => navigate(`/${item.name}`)} />
            <p>{item.name}</p>
          </div>
        </div>
        <h3 style={{ color: 'white', textAlign: 'center', fontFamily: 'Inter' }}>General Chat</h3>
        <div className='message_reserve'>

          {text.flatMap(el => (
            <div key={el.id} className={el.user !== userName.displayName ? 'message_plus' : 'message_sms'}>
              <img style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }} src={el.photo} alt="user" />
              <p>{el.user}</p>
              <span>{el.message}</span>

            </div>
          ))}
        </div>
      </div>
      <Slack />
      {/* <span ref={ref}></span> */}
    </>
  )
}

export default Messages;
