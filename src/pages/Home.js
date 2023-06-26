import React, { useContext, useEffect, useState } from 'react'

import { app } from '../firebase/fifebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getUser } from '../story/UserStory'
import { AuthContext } from '../context/AuthContext';


const Home = () => {
  const { userName } = useContext(AuthContext)
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const db = getFirestore(app)

  const dataUsers = async () => {
    const querySnapshot2 = await getDocs(collection(db, "data"));
    let arr = []
    querySnapshot2.forEach((doc) => {
      arr.push(doc.data())

    });
    setData(arr)
  }
  useEffect(() => {
    dataUsers()
    // eslint-disable-next-line
  }, [])
  const getUserData = (el) => {
    dispatch(getUser(el))
    navigate(`/${el}`)
  }
  const userChat = (user) => {
    dispatch(getUser(user))
    navigate(`/chat/${user}`)
  }
  const userProfile = (id) => {
    dispatch(getUser(id))
    navigate(`/profile/${id}`)
  }
  return (
    <>

      <Header />
      <Navbar />

      {data.map(elem => (
        <Card fileImg={elem.img} user={elem.userId} key={elem.timestamp}
          title={elem.text} avatar={elem.date} getUser={() => getUserData(elem.userId)}
          toData={elem.timestamp} time={elem.clock} sendMessage={() => userChat(elem.userId)}

        />
      ))}

      <Footer Chat={() => userChat(userName.displayName)} User={() => userProfile(userName.displayName)} />

    </>
  )
}

export default Home
