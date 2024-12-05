import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { useState } from 'react'
import { resetForm } from '../../../context/slices/formSlice'
import { pageLabels } from '../../../data/pageLabels'
import RentNowForm from '../../Organisms/RentNowForm/RentNowForm'
import RentNowDetails from '../../Organisms/RentNowDetails/RentNowDetails'

const RentNowPopUp = ({ onClose }) => {
  const dispatch = useDispatch()
  const [formNumber, setFormNumber] = useState(1)

  const handleClose = () => {
    dispatch(resetForm())
    onClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-popUpBg1 z-10'>
      <div className='w-11/12 md:w-[695px] h-fit flex flex-col justify-center items-center bg-gray2 rounded-lg p-6 relative mx-auto border border-gray1 gap-4'>
        <AiOutlineClose className='close-btn absolute top-4 right-4' size={30} onClick={() => handleClose()} />
        <p className='title'>{pageLabels.createBookin.title}</p>
        <p className='text-white text-xl font-Urbanist'>{pageLabels.createBookin.subtitle}</p>
        <div className='w-full flex justify-center text-yellow1 font-bold relative mb-3'>
          {
          formNumber !== 1 &&
            <AiOutlineArrowLeft size={20} className='cursor-pointer absolute left-0' onClick={() => setFormNumber(formNumber - 1)} />
        }
          <p className=''>Paso {formNumber}</p>
        </div>

        {
          formNumber === 1 &&
            <RentNowForm onClose={handleClose} formNumber={formNumber} setFormNumber={setFormNumber} />
        }
        {
          formNumber === 2 &&
            <RentNowDetails onClose={handleClose} />
        }
      </div>
    </div>
  )
}

export default RentNowPopUp
