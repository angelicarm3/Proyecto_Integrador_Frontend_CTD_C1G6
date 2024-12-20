import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllProductsAdminThunk, resetStatus } from '../../../context/slices/adminProductSlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import Paginator from '../../Molecules/Paginator/Paginator'
import ProductRow from '../../Molecules/ProductRow/ProductRow'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import './AdminProducts.css'

const headers = ['id', 'labelName', 'category', 'dayPrice', 'plate', 'actions']

const AdminProducts = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { items } = useSelector((state) => state.paginator)
  const { loading, allProducts, totalProducts } = useSelector((state) => state.adminProducts)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllProductsAdminThunk())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterData(allProducts))
  }, [dispatch, allProducts])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(allProducts))
  }

  return (
    <div className='admin-products-container'>
      <p className='title'>{t('productsList')}</p>
      <div>
        <section className='admin-products-section'>
          <div className='flex gap-3 h-full'>
            <BackBtn navigateTo='/administracion' />
            <AddBtn navigateTo='/administracion/agregar-producto' />
          </div>
          <div className='admin-products-dropDown-conatiner'>
            <span>{t('results')}</span>
            <Dropdown allItems={allProducts} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((product) =>
              <ProductRow key={product.id} product={product} />)
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalProducts} onClick={onChangePage} />

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminProducts
