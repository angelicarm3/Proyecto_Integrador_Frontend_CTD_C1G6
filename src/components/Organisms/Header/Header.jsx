import { useEffect, useState } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import logoGold from '../../../assets/brand/logoGold.png'
import sloganGold from '../../../assets/brand/sloganGold.png'
import { fetchAllBookinsThunk } from '../../../context/slices/bookinsSlice'
import { initializeFavorites } from '../../../context/slices/favoritesSlice'
import { fetchUserByUserNameThunk, resetState } from '../../../context/slices/loginRegisterSlice'
import { resetPagination } from '../../../context/slices/paginatorSlice'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import './header.css'

function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOn, setIsOn] = useState(false)
  const { isAdmin, isLoggedIn, loggedUser, error, userName } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchAllBookinsThunk())
  }, [dispatch])

  useEffect(() => {
    if (userName && token) {
      dispatch(fetchUserByUserNameThunk({ userName, token }))
    }
    if (error?.includes('JWT es invalido')) {
      dispatch(resetState())
      localStorage.clear()
      navigate('/inicio-sesion')
    }
  }, [userName, error, token, navigate, dispatch])

  useEffect(() => {
    if (Object.keys(loggedUser).length > 0) {
      dispatch(initializeFavorites(loggedUser.autosFavoritos))
    } else {
      dispatch(initializeFavorites([]))
    }
  }, [loggedUser, dispatch])

  const toggleDropdown = () => {
    setIsOn(!isOn)
  }

  const handleClickHome = () => {
    dispatch(resetPagination())
    navigate('/')
  }

  const handleLogout = () => {
    dispatch(resetState())
    dispatch(resetPagination())
    localStorage.clear()
    toggleDropdown()
  }

  return (
    <header className='header'>
      <AiOutlineMenu size={30} className='hamburguer-icon' onClick={toggleDropdown} />
      <button type='button' className='logo-container' onClick={handleClickHome}>
        <img src={isoTipoGold} alt='isotipo' className='isotipo' />
        <div className='logo-slogan-container'>
          <img src={logoGold} alt='logo' className='logo' />
          <img src={sloganGold} alt='slogan' className='slogan' />
        </div>
      </button>
      {/* <Navbar /> */}
      {
        isLoggedIn
          ? <div className='flex'>
            <h3 className='my-user-name'>{loggedUser.nombre + ' ' + loggedUser.apellido}</h3>
            <div onClick={toggleDropdown} className='my-avatar-icon'>
              {loggedUser.nombre.charAt(0) + loggedUser.apellido.charAt(0)}
            </div>
            {
              isOn && (
                <div className='dropdown-menu'>
                  <div className='w-full flex text-yellow1 flex md:hidden items-center justify-center '>
                    <h3 className='w-full md:hidden text-yellow1'>{loggedUser.nombre + ' ' + loggedUser.apellido}</h3>
                    <p className='flex bg-[rgb(102,102,102)] min-w-[50px] h-[50px] rounded-full border-4 border-yellow1 items-center justify-center'>{loggedUser.nombre.charAt(0) + loggedUser.apellido.charAt(0)}</p>
                  </div>
                  {
                    isAdmin &&
                      <Link to='/administracion' className='logout-button bg-transparent text-yellow1'>Panel administración</Link>
                  }
                  <Link to='/mis-favoritos' className='logout-button bg-transparent text-yellow1'>Mis favoritos</Link>
                  <Link to='/mis-reservas' className='logout-button bg-transparent text-yellow1'>Mis reservas</Link>
                  <button onClick={handleLogout} className='logout-button'>Cerrar sesión</button>
                </div>
              )
            }
            </div>
          : <div>
            <div className='buttons-container'>
              <LogInBtn />
              <SignUpBtn />
            </div>
            {
              isOn && (
                <div className='dropdown-menu'>
                  <LogInBtn />
                  <SignUpBtn />
                </div>
              )
            }
            </div>
      }
    </header>
  )
}

export default Header
