import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../firebase/fifebase'
import { BsFillBackspaceFill } from 'react-icons/bs'
import '../style/sms.css'
import { useNavigate } from 'react-router-dom'
import Chat from '../components/Chat'
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { getUser } from '../story/UserStory';

const Search = () => {
  const db = getFirestore(app)
  const { userName } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [isName, setUsName] = useState('')
  const [dataUser, setDataUser] = useState([])

  const SearchUser = async () => {
    const q = query(collection(db, "users"), where("name", "==", isName));
    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
    });
    setDataUser(array)
  }
  const handleKey = (e) => {
    e.code === 'Enter' && SearchUser()

  }
  const navigate = useNavigate()
  const userPages = (user) => {
    dispatch(getUser(user))
    navigate(`/chat/${user}`)
  }
  return (
    <div className='sms'>
      <div className="sms_search">
        <BsFillBackspaceFill size={25} onClick={() => navigate('/')} style={{ color: 'white', margin: 10 }} />
        <input type="text" placeholder='Search...' onKeyDown={handleKey} value={isName}
          onChange={(e) => setUsName(e.target.value)} />
      </div>

      <ul>
        <Chat text={userName.displayName} userPhoto={userName?.photoURL} />
        {dataUser.map(elem => (
          <Chat user={elem.name} text={elem.text} onClick={() => userPages(elem.name)} userPhoto={elem?.photo} key={elem.uid} />
        ))}
      </ul>
    </div>
  )
}

export default Search;