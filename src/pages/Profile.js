import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../style/profile.css'
import Footer from '../components/Footer'

const Profile = () => {
  const { userName } = useContext(AuthContext)
  console.log(userName)
  return (
    <div className='profile'>
      <h1 >{userName.displayName}</h1>
      <img src={userName.photoURL} alt="user" />
      <p>8 999 222 123 123</p>
      <h3>{userName.email}</h3>
      <p>City <span>Moscow</span></p>
      <p>Femali</p>
      <span>Friends</span>
      <div>
        <img style={{ width: 45, height: 45, borderRadius: 50, objectFit: 'cover' }} src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg" alt="friend" />
        <img style={{ width: 45, height: 45, borderRadius: 50, objectFit: 'cover' }} src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg" alt="friend" />
        <img style={{ width: 45, height: 45, borderRadius: 50, objectFit: 'cover' }} src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg" alt="friend" />

      </div>
      <Footer />
    </div>
  )
}

export default Profile
