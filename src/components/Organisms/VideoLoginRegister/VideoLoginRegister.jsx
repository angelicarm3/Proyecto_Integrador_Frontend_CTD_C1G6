import banner from '../../../assets/videos/banner.mp4'
import './videoLoginRegister.css'

const VideoLoginRegister = () => {
  return (
    <video autoPlay loop muted className='login-video-container h-[660px] w-full'>
      <source src={banner} type='video/mp4' />
    </video>
  )
}

export default VideoLoginRegister
