import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../firebase/fifebase';
import { BsCameraFill } from 'react-icons/bs'
import '../style/register.css'
import { useState } from 'react'

const Register = () => {
  const auth = getAuth(app);
  const storage = getStorage(app)
  const db = getFirestore(app)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  // const [err, setErr] = useState(false)

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          const storageRef = ref(storage, 'user/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadBytes(storageRef, file).then(() => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              })
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: username,
                email,
                password,
                photo: downloadURL
              });

              navigate('/')
            })
          });
          setEmail('')
          setPassword('')
          setUserName('')
          setFile(null)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // setErr(true)
          console.log(errorCode, errorMessage)

        });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='register'>

      <form className="register_container" onSubmit={createUser}>
        <div className="register_img" style={{ height: 250, width: 270 }}></div>
        {/* <img src="/images/t.jpg" alt="tiger" /> */}
        <h2>Instagram</h2>
        <input type="text" placeholder='FirstName' onChange={(e) => setUserName(e.target.value)} value={username} />
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />

        <input style={{ display: 'none' }} type="file" id='file' onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="file" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} >
          <BsCameraFill size={20} />
          <span style={{ margin: 10 }}>  Add an avatar</span>
        </label>
        <button>Sing Up</button>
        <p>Have you account? < span><Link to={'/login'}>Login</Link></span></p>
      </form>
    </div>
  )
}

export default Register
