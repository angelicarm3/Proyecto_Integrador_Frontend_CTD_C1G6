import React, { useState } from 'react'
import { BiSolidDetail, BiSolidHide } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { setSelectedProduct } from '../../../context/slices/adminProductSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiTrash } from 'react-icons/hi'

const ProductRow = ({ product, setShowConfirmDelete }) => {
  const dispatch = useDispatch()
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // const handleHide = () => {
  //   // Lógica para eliminar el producto
  // }

  const handleSelectUser = () => {
    dispatch(setSelectedProduct(product))
    setIsDetailsModalOpen(true)
  }

  const handleDelete = (product) => {
    dispatch(setSelectedProduct(product))
    setShowConfirmDelete(true)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }
  console.log(product)

  return (
    <tr>
      <td className='border px-4 py-2 text-center'>{product.id}</td>
      <td className='border px-4 py-2'>{product.marca} {product.modelo}</td>
      <td className='border px-4 py-2 text-center'>
        <div className='flex justify-center items-center gap-6'>
          <div>
            {
            product.categorias.map((category, index) => (
              <p key={index}>{category.nombre}</p>
            ))
          }
          </div>
          <Link
            className='text-gray3 text-lg'
            to={`/administracion/editar-producto/${product.id}`}
          >
            <FaEdit />
          </Link>
        </div>
      </td>
      <td className='border px-4 py-2 text-center'>{product.precioDia}</td>
      <td className='border px-4 py-2 text-center'>{product.matricula}</td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          {/* <button
            className='bg-green1 px-4 py-2 rounded text-xl'
            onClick={handleHide}
          >
            <BiSolidHide size={24} />
          </button> */}
          <Link
            className=' bg-blue1 px-4 py-2 rounded text-lg'
            to={`/administracion/editar-producto/${product.id}`}
          >
            <FaEdit size={24} />
          </Link>
          <button
            className='bg-yellow1 px-4 py-2 rounded text-xl'
            onClick={handleSelectUser}
          >
            <BiSolidDetail size={24} />
          </button>
          <button
            className='bg-red1 px-4 py-2 rounded'
            onClick={() => handleDelete(product)}
          >
            <HiTrash size={24} />
          </button>
        </div>
      </td>

      {isDetailsModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
            <h2 className='text-xl font-semibold mb-4'>Detalles del Usuario</h2>
            <p><strong>Producto:</strong> {product.marca} {product.modelo}</p>
            <p><strong>Matrícula:</strong> {product.matricula}</p>
            <p><strong>Año de fabricación:</strong> {product.fechaFabricacion}</p>
            <p><strong>Potencia:</strong> {product.potenciaHP}</p>
            <p><strong>Velocidad:</strong> {product.velocidad}</p>
            <p><strong>Aceleración:</strong> {product.aceleracion}</p>
            <p><strong>Precio por día:</strong> {product.precioDia}</p>
            <p><strong>Descripción:</strong> {product.descripcion}</p>

            <div className='mt-4 text-center'>
              <button
                className='bg-gray-300 text-black px-4 py-2 rounded'
                onClick={handleCloseDetailsModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  )
}

export default ProductRow
