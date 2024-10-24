import React from 'react'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Panel de Administración</h1>
      <Link to='/products' className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded'>
        Lista de productos
      </Link>
    </div>
  )
}

export default AdminPanel
