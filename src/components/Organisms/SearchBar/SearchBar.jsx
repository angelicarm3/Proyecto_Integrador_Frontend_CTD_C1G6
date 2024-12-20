import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Datepicker from 'react-tailwindcss-datepicker'

import { useTranslation } from 'react-i18next'
import { fetchProductsByTimeFrameThunk, getProductsBySearchTerm, resetDatePicker, resetFilters, resetSearchBar, setSearchTerm, setSelectedDates, setSuggestions } from '../../../context/slices/productSlice'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import './searchBar.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const { searchTerm, suggestions, selectedDates } = useSelector((state) => state.product)
  const { setValue } = useForm({ mode: 'onBlur', defaultValues: searchTerm })

  useEffect(() => {
    setValue('searchTerm', searchTerm)
  }, [searchTerm, setValue])

  function formatDateToYYYYMMDD (date) {
    const year = date?.getFullYear()
    const month = String(date?.getMonth() + 1).padStart(2, '0')
    const day = String(date?.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    dispatch(setSearchTerm(value))

    if (value.trim() !== '') {
      dispatch(setSuggestions(value))
    } else if (searchTerm !== '') {
      dispatch(resetFilters())
    }
  }

  const handleDeleteSearchBar = () => {
    if (searchTerm.trim() !== '') {
      dispatch(resetSearchBar())
    }
  }

  const handleClickSearchTerm = (value) => {
    setValue('searchTerm', value)
    dispatch(setSearchTerm(value))
    dispatch(setSuggestions(''))
  }

  const handleDateChange = (dates) => {
    const stringDates = {
      startDate: dates?.startDate ? formatDateToYYYYMMDD(dates.startDate) : null,
      endDate: dates?.endDate ? formatDateToYYYYMMDD(dates.endDate) : null
    }

    if (!stringDates.startDate && !stringDates.endDate) {
      dispatch(resetDatePicker())
    } else {
      dispatch(setSelectedDates(stringDates))
    }
  }

  return (
    <section className='main-section flex flex-col items-center'>
      <p className='title'>{t('fastSearch')}</p>
      <p className='search-bar-subtitle '>{t('useOurSearchEngineToFindYourIdealCar')}</p>
      <div className='w-full flex flex-col lg:flex-row gap-3'>
        <div className='search-bar-container'>
          <label htmlFor='searchTerm' className='label'>{t('labelKeywordSearch')}</label>
          <div className='w-full flex gap-2'>
            <input
              className='w-full input'
              id='searchTerm'
              type='text'
              value={searchTerm}
              placeholder={t('lookForYourCar')}
              onChange={handleInputChange}
            />
            <SearchBtn onSearchClick={getProductsBySearchTerm} />
          </div>
          {
            searchTerm !== '' &&
              <AiOutlineClose className='close-btn absolute top-[52px] right-[65px] text-gray1' size={17} onClick={() => handleDeleteSearchBar()} />
          }

          {
            suggestions.length > 0 && (
              <ul className='suggestions-list w-full top-20 bg-white border rounded mt-2 shadow absolute z-10'>
                {
                  suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className='cursor-pointer px-4 py-2 hover:bg-gray-200'
                      onClick={() => handleClickSearchTerm(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>

        <div className='search-bar-container'>
          <label htmlFor='searchTerm' className='label'>{t('labelDatesSearch')}</label>
          <div className='w-full hidden md:flex gap-2'>
            <Datepicker
              i18n={i18n.language}
              startWeekOn='mon'
              popoverDirection='down'
              containerClassName='w-full relative font-Urbanist'
              inputClassName='input w-full text-black1'
              primaryColor='yellow'
              displayFormat='DD/MM/YYYY'
              separator='-'
              theme='light'
              placeholder={t('selectTheDates')}
              value={selectedDates}
              onChange={newValue => handleDateChange(newValue)}
              disabledDates={[
                {
                  startDate: new Date(0),
                  endDate: new Date()
                }
              ]}
            />
            <SearchBtn onSearchClick={fetchProductsByTimeFrameThunk} />
          </div>
          <div className='w-full flex md:hidden gap-2'>
            <Datepicker
              i18n={i18n.language}
              useRange={false}
              startWeekOn='mon'
              popoverDirection='down'
              containerClassName='w-full relative font-Urbanist'
              inputClassName='input w-full text-black1'
              primaryColor='yellow'
              displayFormat='DD/MM/YYYY'
              separator='-'
              theme='light'
              placeholder={t('selectTheDates')}
              value={selectedDates}
              onChange={newValue => handleDateChange(newValue)}
              disabledDates={[
                {
                  startDate: new Date(0),
                  endDate: new Date()
                }
              ]}
            />
            <SearchBtn onSearchClick={fetchProductsByTimeFrameThunk} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar
