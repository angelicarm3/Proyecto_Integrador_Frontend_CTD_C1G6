import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import './App.css'
// import Navbar from './containers/navbar/Navbar.jsx'
import Footer from './Common/Components/Footer/Footer'
import Home from './pages/home/components/Home'

function App () {
  function LayoutWithNavbarAndFooter () {
    return (
      <div className='w-screen flex flex-col'>
        <h1 className='title'>Hola mundo</h1>
        {/* <Navbar /> */}
        <Outlet />
        {<Footer />}
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithNavbarAndFooter />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
