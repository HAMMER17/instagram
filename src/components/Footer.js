import { BsHouseAddFill, BsSearch, BsPersonVideo, BsEnvelopeAtFill, BsFillPeopleFill } from 'react-icons/bs'
import '../style/footer.css'
import { useNavigate } from 'react-router-dom'

const Footer = ({ User, Chat }) => {
  const navigate = useNavigate()
  return (
    <div className='footer'>
      <BsHouseAddFill size={25} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      <BsSearch size={25} style={{ cursor: 'pointer' }} onClick={() => navigate('/search')} />
      <BsPersonVideo size={25} style={{ cursor: 'pointer' }} onClick={User} />
      <BsEnvelopeAtFill size={25} style={{ cursor: 'pointer' }} />
      <BsFillPeopleFill size={25} style={{ cursor: 'pointer' }} onClick={Chat} />
    </div>
  )
}

export default Footer
