import '../style/navbar.css'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { app } from '../firebase/fifebase';
import { useDispatch } from 'react-redux';
import { getUser } from '../story/UserStory';

const Navbar = () => {
  const db = getFirestore(app)
  const { userName } = useContext(AuthContext)

  const [user, setUser] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addData = () => {
    navigate('/add')
  }
  const getUserPage = (elem) => {
    dispatch(getUser(elem))
    navigate(`/${elem}`)
  }
  const dataUsers = async () => {

    const querySnapshot = await getDocs(collection(db, "users"));
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setUser(arr)
  }
  useEffect(() => {
    dataUsers()
    //eslint-disable-next-line 
  }, [])
  return (
    <div className='navbar'>
      <div className="navbar_user">

        <img src={userName.photoURL} alt="ava" />
        <span onClick={addData}><AiFillPlusCircle size={25} /></span>
        <h3>{userName.displayName}</h3>
      </div>

      <div className="navbar_friends">
        {user.map(elem => (
          <span key={Math.random()}>
            <img src={elem.photo} alt="ava" onClick={() => getUserPage(elem.name)} style={{ cursor: 'pointer' }} />
            <p style={{ color: 'white' }}>{elem.name.toLowerCase()}</p>
          </span>
        ))}
      </div>

    </div>
  )
}

export default Navbar
