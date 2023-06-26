import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/fifebase';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const getUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate('/')
        }
        console.log(user)
      })
      // setEmail('')
      // setPassword('')
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }
  return (
    <div className='register'>
      <form className="register_container" onSubmit={getUser} >
        <div className="register_img" style={{ height: 250, width: 270 }}></div>
        {/* <img src="/images/t.jpg" alt="tiger" /> */}
        <h2>Login</h2>
        <input type="text" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="text" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button>Sugn In</button>
        <p>Have not you login? < span><Link to={'/register'}>Register</Link></span></p>
      </form>
    </div>
  )
}

export default Login
