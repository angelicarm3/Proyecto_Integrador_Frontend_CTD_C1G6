import { useSelector } from 'react-redux'
import './AdminCharacteristicsEdit'
import CreateEditProductForm from '../../Organisms/CreateEditProductForm/CreateEditProductForm'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminCharacteristicsEdit = () => {
  const { loading } = useSelector((state) => state.form)
  return (
    <section className='main-section admin-create-product-container'>
      <CreateEditProductForm />
      {
        loading &&
          <LoaderComponent />
      }
    </section>
  )
}

export default AdminCharacteristicsEdit
