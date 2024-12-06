import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WappBtn = () => {
  return (
    <div className='absolute'>
      <Link className='fixed bottom-10 right-0 flex items-center justify-center bg-yellow1 h-20 w-20 rounded-full hover:h-24 hover:w-24 hover:mr-3 hover:mb-3 hover:opacity-75 z-10 mr-4 mb-4' to='https://wa.me/+573143899603' target='_blank' rel='noreferrer'>
        <FaWhatsapp size={55} />
      </Link>
    </div>
  )
}

export default WappBtn
