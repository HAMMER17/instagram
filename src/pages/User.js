import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

import '../style/user.css'
import { app } from "../firebase/fifebase";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate()
  const state = useSelector(state => state.user.value)
  const [item, setItem] = useState([])

  const db = getFirestore(app)
  const getUser = async () => {
    const q = query(collection(db, "users"), where("name", "==", state));

    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setItem(arr)
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line 
  }, [state])
  return (
    <div >
      {item.map(elem => (
        <div key={elem.uid} className="user">
          <h4>{elem.email}</h4>
          <img src={elem.photo} alt="avatar" />
          <h2>{elem.name}</h2>
          <p>Hello I {elem.name} Welcome, I created this app, that helps find friends,here you
            can write about you, hobby, work, added photo and write message...
          </p>
          <button onClick={() => navigate(`/chat/${elem.name}`)}>sms</button>
          {/* <input type="text" placeholder="SMS..." /> */}
          <p>9 888 444 333 111</p>
          <div className="user_photo">
            <img src="/images/camera.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/t.jpg" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/data.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/manki.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/tiger.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/tree1.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/camera.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/t.jpg" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/data.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/manki.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/tiger.webp" alt="photo1" style={{ width: 80, height: 80 }} />
            <img src="/images/tree1.webp" alt="photo1" style={{ width: 80, height: 80 }} />
          </div>

        </div>
      ))}

      <Footer />
    </div>
  )
}

export default User
