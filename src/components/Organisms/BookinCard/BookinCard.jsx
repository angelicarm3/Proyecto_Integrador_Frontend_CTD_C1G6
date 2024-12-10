import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteBookinThunk, fetchBookinsByIdThunk, resetStatus, setSelectedBookin } from '../../../context/slices/bookinsSlice'

const BookinCard = ({ booking }) => {
  const { auto, fechaInicio, fechaFin, estado, id, lugarEntrega, lugarRecogida } = booking
  const dispatch = useDispatch()
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  const totalDays = Math.ceil((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24))

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
  }

  const resetTable = () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      dispatch(resetStatus())
      dispatch(fetchBookinsByIdThunk({ userId: loggedUser.id, token }))
    }, '2000')
  }

  const handleDelete = () => {
    dispatch(setSelectedBookin(booking))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>¿Deseas eliminar esta reserva?</p>,
      html: `
        <div class="w-fit flex flex-col items-center text-center mx-auto gap-2">
          <p><strong>Auto:</strong> ${auto.marca} ${auto.modelo}</p>
          <p><strong>Fecha de inicio:</strong> ${formatDate(fechaInicio)}</p>
          <p><strong>Fecha de entrega:</strong> ${formatDate(fechaFin)}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-green1 text-white font-bold',
        cancelButton: 'bg-red1 text-white font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBookinThunk({ id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Reserva eliminada exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede eliminar esta reserva',
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
      }
    })
  }

  return (
    <div className='text-gray6 p-4 rounded-lg'>

      <div className='text-sm text-gray3 mb-2'>ID: {id}</div>

      <img
        src={auto.imagenes[0]?.url || '/default-image.jpg'}
        alt={`${auto.marca} ${auto.modelo}`}
        className='w-full h-40 object-cover rounded-lg mb-4'
      />
      <div className='flex flex-col space-y-2'>
        <h2 className='font-semibold text-xl text-yellow1'>{auto.marca} {auto.modelo}</h2>
        <p><strong>Fecha de inicio:</strong> {formatDate(fechaInicio)}</p>
        <p><strong>Fecha de entrega:</strong> {formatDate(fechaFin)}</p>
        <p><strong>Total de días:</strong> {totalDays} {totalDays === 1 ? 'día' : 'días'}</p>
        <p><strong>Lugar de recogida:</strong> {lugarRecogida}</p>
        <p><strong>Lugar de retorno:</strong> {lugarEntrega}</p>

        <button
          onClick={handleDelete}
          className='mt-12 bg-red1 text-white font-bold py-2 px-4 rounded hover:opacity-75'
        >
          Cancelar Reserva
        </button>
      </div>
    </div>
  )
}

export default BookinCard
