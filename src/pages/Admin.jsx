import React from 'react'
import ProductList from '../Common/Components/ProductList/ProductList'

const Admin = () => {
  const handleAddProduct = () => {
    // Lógica para agregar el producto
    console.log(`Agregar producto ${product.id}`)
  }
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Administración de Productos</h1>
      <section>
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="border border-gray-300 px-4 py-2 rounded w-full mb-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full"
          >
            Buscar
          </button>
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'
          onClick={handleAddProduct}
        >
          Agregar Producto
        </button>
      </section>
      <ProductList />
    </div>
  )
}

export default Admin
