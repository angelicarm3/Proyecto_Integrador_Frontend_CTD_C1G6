import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { fetchAllCharacteristicsThunk } from '../../../context/slices/adminCharacteristicSlice'
import { fetchAllCategoriesThunk } from '../../../context/slices/categorySlice'
import { clearError, resetForm, submitFormThunk, updateField, updateHasSubmited, updateImgSuccess, uploadImagesThunk } from '../../../context/slices/formSlice'
import { fetchProductByIdThunk } from '../../../context/slices/productSlice'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createProductFormFields } from '../../../service/formInputsService'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import ButtonField from '../../Molecules/ButtonField/ButtonField'
import FormField from '../../Molecules/FormField/FormField'
import './createEditProductForm.css'

const CreateEditProductForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const { productData, error, imgSuccess } = useSelector((state) => state.form)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const allCategories = useSelector((state) => state.category.allCategories)
  const allCharacteristics = useSelector((state) => state.adminCharacteristic.allCharacteristics)

  const { selectedImages, filePreviews, setFilePreviews, imagesRequiredError, setImagesRequiredError, handleFileChange, removeImage } = useImageUpload()
  const maxDescriptionCharacters = 200
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([])

  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur', defaultValues: productData })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetForm())
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchProductByIdThunk(id))
      }
      dispatch(fetchAllCategoriesThunk())
      dispatch(fetchAllCharacteristicsThunk())
    }
    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    if (selectedProduct) {
      Object.keys(selectedProduct).forEach((key) => {
        setValue(key, selectedProduct[key] || '')
        dispatch(updateField({ field: key, value: selectedProduct[key], form: 'createProduct' }))
      })
      setSelectedCategories(selectedProduct.categorias || [])
      setSelectedCharacteristics(selectedProduct.caracteristicas || [])
      setFilePreviews(selectedProduct.imagenes || [])
    }
  }, [selectedProduct, dispatch])

  const handleSelectionChange = (item, setState) => {
    setState((prev) =>
      prev.some(selected => selected.id === item.id)
        ? prev.filter(selected => selected.id !== item.id)
        : [...prev, item]
    )
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'matricula') {
      dispatch(clearError())
    }
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'createProduct' }))
  }

  const handleCancelClick = () => {
    dispatch(resetForm())
    navigate(-1)
  }

  const onSubmit = () => {
    window.scrollTo(0, 0)
    dispatch(updateHasSubmited())
    dispatch(updateField({ field: 'categorias', value: selectedCategories, form: 'createProduct' }))
    dispatch(updateField({ field: 'caracteristicas', value: selectedCharacteristics, form: 'createProduct' }))

    if (selectedCategories.length > 0 && selectedCharacteristics.length > 0) {
      if (selectedImages.length === 0) {
        if (filePreviews.length === 0) {
          setImagesRequiredError(true)
        } else {
          dispatch(updateField({ field: 'imagenes', value: filePreviews, form: 'createProduct' }))
          dispatch(updateImgSuccess())
        }
      } else {
        dispatch(uploadImagesThunk({ files: selectedImages, form: 'createProduct' }))
      }
    }
  }

  useEffect(() => {
    if (imgSuccess && productData?.imagenes?.length > 0) {
      if (location.pathname.includes('editar')) {
        dispatch(submitFormThunk({ formData: productData, formURL: `autos/update/${selectedProduct?.id}`, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Producto modificado exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/productos')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede modificar este producto',
              showConfirmButton: false,
              timer: 3000
            })
          })
      } else {
        dispatch(submitFormThunk({ formData: productData, formURL: 'autos/register', token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Producto creado exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/productos')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede crear este producto',
              showConfirmButton: false,
              timer: 3000
            })
          })
      }
    }
  }, [imgSuccess, productData, dispatch, location, navigate, selectedProduct, token])

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{pageLabels.createProduct.title}</p>

      <div className='form-fields-container'>
        {
          createProductFormFields.map(({ autoComplete, id, label, validation, extraErrorMessage }) => (
            <FormField
              fieldWidth='w-5/12'
              key={id}
              autoComplete={autoComplete}
              id={id}
              type='text'
              label={label}
              value={productData[id]}
              inputClass='input'
              register={register}
              validation={{
                required: { value: true, message: pageLabels.createProduct.requiredError },
                ...validation
              }}
              onChange={handleInputChange}
              error={errors[id]}
              promiseError={error}
              extraErrorMessage={extraErrorMessage}
            />
          ))
        }

        <ButtonField
          items={allCharacteristics}
          containerClass='field-container w-11/12'
          label={pageLabels.createProduct.characteristic}
          labelClass='label'
          selectedItems={selectedCharacteristics}
          onChange={(item) => handleSelectionChange(item, setSelectedCharacteristics)}
          errorMessage={pageLabels.createProduct.requiredSelectionError}
        />

        <ButtonField
          items={allCategories}
          containerClass='field-container w-11/12'
          label={pageLabels.createProduct.category}
          labelClass='label'
          selectedItems={selectedCategories}
          onChange={(item) => handleSelectionChange(item, setSelectedCategories)}
          errorMessage={pageLabels.createProduct.requiredSelectionError}
        />

        <div className='field-container relative w-11/12'>
          <label htmlFor='descripcion' className='label'>
            {pageLabels.createProduct.description}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={productData.descripcion}
            className={`input description-input ${errors.descripcion && 'border-red1'}`}
            placeholder={pageLabels.createProduct.description}
            {...register('descripcion', {
              required: {
                value: true,
                message: `${pageLabels.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          <div className='input-counter'>
            {maxDescriptionCharacters - (productData.descripcion?.length || 0)} {pageLabels.createProduct.characterCount}
          </div>
          {
          errors.descripcion && <FormErrorMessage message={errors.descripcion.message} error='description' />
          }
        </div>

        <div className='field-container relative w-11/12'>
          <label htmlFor='imagenes' className='label'>
            {pageLabels.createProduct.images}
          </label>
          <div className='flex gap-4'>
            <input
              id='imagenes'
              type='file'
              multiple
              onChange={handleFileChange}
              className='hidden'
            />
            <button
              type='button'
              className={`input images-btn ${imagesRequiredError && 'border-red1'}`}
              onClick={() => document.getElementById('imagenes').click()}
            >
              <AiOutlineFileImage size={40} className='img-icon' />
              <p className='img-placeholder'>{pageLabels.createProduct.imgPlaceholder}</p>
            </button>
            <div className='preview-grid'>
              {
                filePreviews?.map((img, index) => (
                  <div key={index} className='relative'>
                    <img src={img.url} alt={`Foto ${index + 1}`} className='preview-img' />
                    <AiOutlineClose className='clickable absolute top-0 right-0 cursor-pointer hover:text-gray3' size={20} onClick={() => removeImage(index)} />
                  </div>
                ))
              }
            </div>
          </div>
          {
            imagesRequiredError && <FormErrorMessage message={pageLabels.createProduct.requiredError} error='images' />
          }
          <p className='input-counter'>{filePreviews.length} {pageLabels.createProduct.fileCount}</p>
        </div>

        <div className='btn-container'>
          <SaveBtn />
          <CancelBtn handleClick={handleCancelClick} />
        </div>
      </div>
    </form>
  )
}

export default CreateEditProductForm
