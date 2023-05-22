import '../style/card.css'

import { BsFillSuitHeartFill } from 'react-icons/bs'
import { MdSms } from 'react-icons/md'
import { AiOutlineBars } from 'react-icons/ai'
import { IoArrowRedo } from 'react-icons/io5'
import { useState } from 'react'

// import moment from 'moment';
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'


const Card = ({ fileImg, title, user, avatar, getUser, toData, time, sendMessage }) => {
  const [heart, setHeart] = useState(false)
  const changeHeart = () => {
    setHeart(!heart)
  }
  const onUser = (elem) => {
    getUser(elem)
  }
  const sendSms = (sms) => {
    sendMessage(sms)
  }
  // const navigate = useNavigate()
  const [modal, setModal] = useState('plus')
  const showModal = () => {
    setModal(modal ? null : 'plus')
  }
  return (
    <div className='card'>
      <div className="card_img">
        <div className="card_item">
          <img style={{ width: 60, height: 60, borderRadius: 50, objectFit: 'cover', cursor: 'pointer' }} onClick={onUser}
            src={avatar} alt="img" />
          <div className="card_user">
            <h3>{user}</h3>
            <p>{time}</p>
          </div>

        </div>
        <AiOutlineBars style={{ cursor: 'pointer' }} size={20} onClick={() => showModal(!modal)} />
        <div className={`card_modal ${modal}`}>
          <div className="card_modal_exit">
            <ul>
              <li>закладки</li>
              <li>уведомление</li>
              <li>написать</li>
              <li>скопировать</li>
              <li>фото</li>
            </ul>
          </div>

        </div>
      </div>
      <div className="card_container">
        <p style={{ margin: '10px 30px' }}>{title}</p>
        <img src={fileImg} alt="cat" />
      </div>
      <div className="card_icon">
        <span>
          <BsFillSuitHeartFill size={20} style={{ color: heart ? 'red' : 'white', cursor: 'pointer' }} onClick={changeHeart} />
        </span>
        <span>
          <MdSms style={{ cursor: 'pointer' }} size={20} />
        </span>
        <span>
          <IoArrowRedo style={{ cursor: 'pointer' }} size={20} onClick={sendSms} />
        </span>
        <p>{toData}</p>
      </div>

    </div>
  )
}

export default Card;
