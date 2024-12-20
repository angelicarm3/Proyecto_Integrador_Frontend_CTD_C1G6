import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllCharacteristicsThunk = createAsyncThunk(
  'adminCharacteristics/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/characteristics/list')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const fetchCharacteristicByIdThunk = createAsyncThunk(
  'adminCharacteristics/fetchCharacteristicById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/characteristics/find/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

// Thunk para borrar una característica por ID
export const deleteCharacteristicThunk = createAsyncThunk(
  'adminCharacteristics/delete',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/characteristics/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const adminCharacteristicSlice = createSlice({
  name: 'characteristic',
  initialState: {
    allCharacteristics: [],
    totalCharacteristics: 0,
    selectedCharacteristic: {},
    loading: false,
    error: null,
    success: false
  },

  reducers: {
    setSelectedCharacteristic: (state, action) => {
      state.selectedCharacteristic = action.payload
    },
    resetStatus: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.selectedCharacteristic = {}
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch characteristics
      .addCase(fetchAllCharacteristicsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllCharacteristicsThunk.fulfilled, (state, action) => {
        state.allCharacteristics = action.payload
        state.totalCharacteristics = state.allCharacteristics.length
        state.loading = false
      })
      .addCase(fetchAllCharacteristicsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })

    // Fetch characteristic by ID
    builder
      .addCase(fetchCharacteristicByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCharacteristicByIdThunk.fulfilled, (state, action) => {
        state.selectedCharacteristic = action.payload
        state.loading = false
      })
      .addCase(fetchCharacteristicByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener la característica'
      })

      // Delete a characteristic
      .addCase(deleteCharacteristicThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCharacteristicThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteCharacteristicThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al eliminar la característica'
      })
  }
})

export const { setSelectedCharacteristic, resetStatus } = adminCharacteristicSlice.actions

export default adminCharacteristicSlice.reducer
