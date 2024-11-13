import { useState } from 'react'

import { Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx"
import { AiOutlineMenu } from 'react-icons/ai'


import './header.css'
import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import sloganGold from '../../../assets/brand/sloganGold.png'
import logoGold from '../../../assets/brand/logoGold.png'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import { resetState } from '../../../context/slices/loginRegisterSlice'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import Navbar from '../../Molecules/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'

function Header () {
  const dispatch = useDispatch()
  const [isOn, setIsOn] = useState(false)
  const toggleMenu = () => setIsOn(!isOn)

  const toggleDropdown = () => {
    setIsOn(!isOn);
  };

  const handleLogout = () => {
    console.log('Cerrar sesión')
    dispatch(resetState())
    localStorage.removeItem('token')
  };

  const { isLoggedIn, loggedUser } = useSelector((state) => state.loginRegister)
  console.log(loggedUser)
  console.log(isLoggedIn)

  return (
    <header className='header'>
      <AiOutlineMenu size={30} className='hamburguer-icon' />
      <Link to='/' className='logo-container'>
        <img src={isoTipoGold} alt='isotipo' className='isotipo' />
        <div className='logo-slogan-container'>
          <img src={logoGold} alt='logo' className='logo' />
          <img src={sloganGold} alt='slogan' className='slogan' />
        </div>
      </Link>
      {/* <Navbar /> */}
      {isLoggedIn ? 
      <>
        <RxAvatar className='avatar-icon' onClick={toggleDropdown}/>
        {isOn && (
        <div className="dropdown-menu">
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </div>
        )}
      </>
      :
      <div className='buttons-container'>
        <LogInBtn />
        <SignUpBtn />
      </div>
      }
    </header>
  )
}

export default Header
