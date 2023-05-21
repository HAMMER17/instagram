import '../style/header.css'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/fifebase';
import { AiOutlineLogout } from 'react-icons/ai'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


const Header = () => {
  const auth = getAuth(app);
  const navigate = useNavigate()

  const [username, setName] = useState('')
  onAuthStateChanged(auth, (user) => {
    setName(user)
  })

  const outUser = () => {
    signOut(auth).then(() => {
      console.log('succsess')
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='header'>

      <h2>Instagram</h2>
      <div className="header_item">
        <>
          {username ? <>
            <AiOutlineLogout style={{ cursor: 'pointer' }} size={30} onClick={outUser} /></> : <>
            <button style={{ background: 'green' }}><Link to={'/register'}>Sugn Up</Link></button>
            <button style={{ background: 'blue' }}><Link to={'/login'}>Sugn In</Link></button>
          </>}
        </>
      </div>
    </div>
  )
}

export default Header
