import { useNavigate } from 'react-router-dom'
import { pageLabels } from '../../../data/pageLabels'
import './AddBtn.css'

const AddBtn = ({ navigateTo }) => {
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate(navigateTo)
  }

  return (
    <button
      onClick={handleAddProduct}
      className='primary-btn addBtn'
    >
      {pageLabels.addBtn.label}
    </button>
  )
}

export default AddBtn
