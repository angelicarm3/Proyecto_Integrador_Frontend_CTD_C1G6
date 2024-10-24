import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Admin from './pages/Admin'
import AdminPanel from './Common/Components/AdminPanel/AdminPanel'

import './App.css'
// import Navbar from './containers/navbar/Navbar.jsx'
// import Footer from './containers/footer/Footer.jsx'
import Home from './pages/home/components/Home'

function App () {
  function LayoutWithNavbarAndFooter () {
    return (
      <div className='w-screen flex flex-col'>
        <h1 className='title'>Hola mundo</h1>
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithNavbarAndFooter />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/AdminPanel' element={<AdminPanel />} />
        <Route path='/products' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
