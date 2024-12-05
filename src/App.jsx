import { Outlet, Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Header from './components/Organisms/Header/Header.jsx'
import RequireAdmin from './context/helpers/RequireAdmin.jsx'
import RequireNoAuth from './context/helpers/RequireNoAuth.jsx'
import RequireAuth from './context/helpers/RequireAuth.jsx'
import Favorites from './components/Pages/Favorites/Favorites.jsx'
import Home from './components/Pages/Home/Home'
import LoginRegister from './components/Pages/LoginRegister/LoginRegister.jsx'
import PoliciesPage from './components/Pages/PoliciesPage/PoliciesPage.jsx'
import ProductDetail from './components/Pages/ProductDetail/ProductDetail.jsx'

import AdminCategories from './components/Pages/AdminCategories/AdminCategories.jsx'
import AdminCharacteristics from './components/Pages/AdminCharacteristics/AdminCharacteristics.jsx'
import AdminCreateEditCategory from './components/Pages/AdminCreateEditCategory/AdminCreateEditCategory.jsx'
import AdminCreateEditCharacteristic from './components/Pages/AdminCreateEditCharacteristic/AdminCreateEditCharacteristic'
import AdminCreateEditProduct from './components/Pages/AdminCreateEditProduct/AdminCreateEditProduct.jsx'
import AdminPanel from './components/Pages/AdminPanel/AdminPanel'
import AdminProducts from './components/Pages/AdminProducts/AdminProducts'
import AdminUsers from './components/Pages/AdminUsers/AdminUsers.jsx'

import ImagesPopUp from './components/Templates/ImagesPopUp/ImagesPopUp.jsx'
import RentNowPopUp from './components/Templates/RentNowPopUp/RentNowPopUp.jsx'
import Bookings from './components/Pages/Bookings/Bookings.jsx'

function App () {
  const location = useLocation()
  const previousLocation = location.state?.previousLocation

  function LayoutWithNavbarAndFooter () {
    return (
      <div className='layout bg-gray2'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  function AdmonLayoutWithNavbarAndFooter () {
    return (
      <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route element={<LayoutWithNavbarAndFooter />}>
          <Route path='/' element={<Home />} />
          <Route path='producto/:id' element={<ProductDetail />} />
          <Route path='inicio-sesion' element={<RequireNoAuth><LoginRegister /></RequireNoAuth>} />
          <Route path='registro' element={<RequireNoAuth><LoginRegister /></RequireNoAuth>} />
          <Route path='mis-favoritos' element={<Favorites />} />
          <Route path='mis-reservas' element={<Bookings />} />
          <Route path='politicas-uso' element={<PoliciesPage />} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Route>

        <Route element={<AdmonLayoutWithNavbarAndFooter />}>
          <Route path='administracion' element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
          <Route path='administracion/productos' element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
          <Route path='administracion/agregar-producto' element={<RequireAdmin><AdminCreateEditProduct /></RequireAdmin>} />
          <Route path='administracion/editar-producto/:id' element={<RequireAdmin><AdminCreateEditProduct /></RequireAdmin>} />
          <Route path='administracion/usuarios' element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
          <Route path='administracion/caracteristicas' element={<RequireAdmin><AdminCharacteristics /></RequireAdmin>} />
          <Route path='administracion/agregar-caracteristica' element={<RequireAdmin><AdminCreateEditCharacteristic /></RequireAdmin>} />
          <Route path='administracion/editar-caracteristica/:id' element={<RequireAdmin><AdminCreateEditCharacteristic /></RequireAdmin>} />
          <Route path='administracion/categorias' element={<RequireAdmin><AdminCategories /></RequireAdmin>} />
          <Route path='administracion/agregar-categoria' element={<RequireAdmin><AdminCreateEditCategory /></RequireAdmin>} />
          <Route path='administracion/editar-categoria/:id' element={<RequireAdmin><AdminCreateEditCategory /></RequireAdmin>} />
        </Route>
      </Routes>

      {
        previousLocation && (
          <Routes>
            <Route path='producto/:id/galeria' element={<ImagesPopUp />} />
            <Route path='producto/:id/galeria' element={<ImagesPopUp />} />
            <Route path='rentar' element={<RentNowPopUp />} />
          </Routes>
        )
      }
    </>
  )
}

export default App
