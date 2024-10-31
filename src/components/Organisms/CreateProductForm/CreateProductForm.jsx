import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AiOutlineFileImage, AiOutlineLoading } from 'react-icons/ai'

import './createProductForm.css'
import { pageData } from '../../../data/page'
import { submitFormThunk, uploadImagesThunk, updateField, clearError, resetForm } from '../../../context/slices/formSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'

const CreateProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [imagesRequiredError, setImagesRequiredError] = useState(false)
  const { data, loading, error, success } = useSelector((state) => state.form)
  const maxDescriptionCharacters = 50
  const maxFiles = 10

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetForm())
        navigate(-1)
      }, '3000')
    }
  }, [success, navigate, dispatch])

  const handleFileChange = (event) => {
    setImagesRequiredError(false)
    const files = Array.from(event.target.files)
    setSelectedImages(files.slice(0, maxFiles))
    setFilePreviews(files.slice(0, maxFiles).map((file) => ({
      url: URL.createObjectURL(file)
    })))
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'matricula') {
      dispatch(clearError())
    }
    clearErrors(id)
    dispatch(updateField({ field: id, value }))
  }

  const onSubmit = async () => {
    if (selectedImages.length === 0) {
      setImagesRequiredError(true)
    } else {
      await dispatch(uploadImagesThunk(selectedImages))
      dispatch(submitFormThunk(data))
    }
  }
  console.log(data)

  return (
    <form className='w-[630px] flex flex-col justify-center items-center bg-gray1 rounded-lg relative p-10' onSubmit={handleSubmit(onSubmit)}>
      <div className='primary-btn w-fit flex flex-col justify-center rounded-3xl bg-black1 absolute top-10 left-10 px-3'>
        <BackBtn />
      </div>
      <p className='title text-black1 mb-6'>{pageData.createProduct.title}</p>

      <div className='w-full flex flex-wrap justify-center gap-x-10'>
        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='marca' className='label'>
            {pageData.createProduct.make}
          </label>
          <input
            id='marca'
            type='text'
            value={data.marca}
            className={`input ${errors.marca && 'border-red1'}`}
            placeholder={pageData.createProduct.make}
            {...register('marca', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.marca && <FormErrorMessage message={errors.marca.message} />
        }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='modelo' className='label'>
            {pageData.createProduct.model}
          </label>
          <input
            id='modelo'
            type='text'
            value={data.modelo}
            className={`input ${errors.modelo && 'border-red1'}`}
            placeholder={pageData.createProduct.model}
            {...register('modelo', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.modelo && <FormErrorMessage message={errors.modelo.message} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='matricula' className='label'>
            {pageData.createProduct.plate}
          </label>
          <input
            id='matricula'
            type='text'
            value={data.matricula}
            className={`input ${(errors.matricula || error?.includes('ya existe en el sistema')) && 'border-red1'}`}
            placeholder={pageData.createProduct.plate}
            {...register('matricula', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^[A-Z]{3}\d{3}$/,
                message: `${pageData.createProduct.validPlateError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.matricula && <FormErrorMessage message={errors.matricula.message} />
          }
          {
          error && error.includes('ya existe en el sistema') && <FormErrorMessage message={pageData.createProduct.existingProductError} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='fechaFabricacion' className='label'>
            {pageData.createProduct.year}
          </label>
          <input
            id='fechaFabricacion'
            type='text'
            value={data.fechaFabricacion}
            className={`input ${errors.fechaFabricacion && 'border-red1'}`}
            placeholder={pageData.createProduct.year}
            {...register('fechaFabricacion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /\b(19|20)\d{2}\b/,
                message: `${pageData.createProduct.validYearError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.fechaFabricacion && <FormErrorMessage message={errors.fechaFabricacion.message} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='potenciaHP' className='label'>
            {pageData.createProduct.horsepower}
          </label>
          <input
            id='potenciaHP'
            type='text'
            value={data.potenciaHP}
            className={`input ${errors.potenciaHP && 'border-red1'}`}
            placeholder={pageData.createProduct.horsepower}
            {...register('potenciaHP', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^\d{1,4}(\.\d{1,2})?$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.potenciaHP && <FormErrorMessage message={errors.potenciaHP.message} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='velocidad' className='label'>
            {pageData.createProduct.speed}
          </label>
          <input
            id='velocidad'
            type='text'
            value={data.velocidad}
            className={`input ${errors.velocidad && 'border-red1'}`}
            placeholder={pageData.createProduct.speed}
            {...register('velocidad', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^([1-9][0-9]{0,2}|1000)$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.velocidad && <FormErrorMessage message={errors.velocidad.message} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='aceleracion' className='label'>
            {pageData.createProduct.acceleration}
          </label>
          <input
            id='aceleracion'
            type='text'
            value={data.aceleracion}
            className={`input ${errors.aceleracion && 'border-red1'}`}
            placeholder={pageData.createProduct.acceleration}
            {...register('aceleracion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^([1-9]|[1-9]\d|[1-9]\d\.\d|10|10\.0|[1-9]\.\d{1,2})$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.aceleracion && <FormErrorMessage message={errors.aceleracion.message} />
          }
        </div>

        <div className='w-5/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='precioDia' className='label'>
            {pageData.createProduct.dayPrice}
          </label>
          <input
            id='precioDia'
            type='number'
            value={data.precioDia}
            className={`input ${errors.precioDia && 'border-red1'}`}
            placeholder={pageData.createProduct.dayPrice}
            {...register('precioDia', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              const value = e.target.value
              handleInputChange({ target: { id: 'precioDia', value: parseFloat(value) } })
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.precioDia && <FormErrorMessage message={errors.precioDia.message} />
          }
        </div>

        {/* <div className='w-11/12 flex flex-col pb-[10px] gap-2 mb-2'>
          <label htmlFor='categorias' className='label'>
            {pageData.createProduct.category}
          </label>
          <input
            id='categorias'
            maxLength={200}
            value={data.categorias}
            className={`input ${errors.categorias && 'border-red1'}`}
            placeholder={pageData.createProduct.category}
            {...register('categorias', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.categorias && <FormErrorMessage message={errors.categorias.message} />
          }
        </div> */}

        <div className='w-11/12 flex flex-col pb-[10px] relative gap-2 mb-2'>
          <label htmlFor='descripcion' className='label'>
            {pageData.createProduct.description}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={data.descripcion}
            className={`input h-[100px] pt-2 ${errors.descripcion && 'border-red1'}`}
            placeholder={pageData.createProduct.description}
            {...register('descripcion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          <div className='text-xs font-Urbanist self-end'>
            {maxDescriptionCharacters - (data.descripcion?.length || 0)} caracteres restantes
          </div>
          {
          errors.descripcion && <FormErrorMessage message={errors.descripcion.message} error='description' />
          }
        </div>

        <div className='w-11/12 flex flex-col pb-[10px] relative gap-2 mb-2'>
          <label htmlFor='imagenes' className='label'>
            {pageData.createProduct.images}
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
              className={`input w-[100px] h-[100px] flex flex-col justify-center items-center hover:border-gray1 ${imagesRequiredError && 'border-red1'}`}
              onClick={() => document.getElementById('imagenes').click()}
            >
              <AiOutlineFileImage size={40} className='text-gray1' />
              <p className='text-xs text-gray1'>Seleccionar imágenes</p>
            </button>
            <div className='w-full h-full flex flex-wrap justify-start gap-3'>
              {filePreviews?.map((img, index) => (
                <img key={index} src={img.url} alt={`Foto ${index + 1}`} className='w-[60px] h-[40px] object-cover' />
              ))}
            </div>
          </div>
          {
            imagesRequiredError && <FormErrorMessage message={pageData.createProduct.requiredError} error='images' />
          }
          <p className='text-right text-xs font-Urbanist'>{filePreviews.length} archivos seleccionados</p>
        </div>

        <div className='flex gap-6 mt-4'>
          <SaveBtn />
          <CancelBtn />
        </div>
      </div>
      {
        loading &&
          <div className='pop-up-bg opacity-25 absolute rounded-lg '>
            <AiOutlineLoading size={40} className='text-gray4 animate-spin' />
          </div>
      }
      {
        success &&
          <div className='pop-up-bg bg-transparent absolute rounded-lg'>
            <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
              <p className='text-xl text-green1'>¡Producto creado con éxito!</p>
            </div>
          </div>
      }
    </form>
  )
}

export default CreateProductForm
