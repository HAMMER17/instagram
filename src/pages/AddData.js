import React, { useContext, useState } from 'react'

import { app } from '../firebase/fifebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
// import { DataContext } from '../context/DataContext';
// import { v4 as uuidv4 } from 'uuid';

const AddData = () => {


  const times = moment().format('MMMM Do YYYY, h:mm:ss a');
  const clock = moment().format('LL');
  // console.log(clock)
  const db = getFirestore(app)
  const storage = getStorage(app)
  const navigate = useNavigate()

  const [text, setText] = useState('')
  const [userImg, setUserImg] = useState(null)

  const { userName } = useContext(AuthContext)

  const createData = (e) => {
    e.preventDefault()

    try {
      const storageRef = ref(storage, 'img/' + userImg.name);
      const uploadTask = uploadBytesResumable(storageRef, userImg);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // eslint-disable-next-line
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
        (error) => {// eslint-disable-next-line
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }

        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            await addDoc(collection(db, "data"), {
              text,
              userId: userName.displayName,
              date: userName.photoURL,
              img: downloadURL,
              timestamp: times,
              id: userName.uid,
              clock: clock,
            });
            navigate('/')
          })
        }
      )

      // setUserImg(null)
      // setText('')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='register'>
      <button className='btn' onClick={() => navigate('/')}>back</button>
      <form className="register_container" onSubmit={createData}>

        <h2>Add Data</h2>
        <input type="text" placeholder='Text...' onChange={(e) => setText(e.target.value)} value={text} />
        <input type="file" onChange={(e) => setUserImg(e.target.files[0])} />
        <button>Added</button>

      </form>
    </div>
  )
}

export default AddData
