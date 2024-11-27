import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllBookinsThunk = createAsyncThunk(
  'reservations/fetchAllBookins',
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://alluring-enchantment-production.up.railway.app/users/${userId}/favorites/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const bookinsSlice = createSlice({
  name: 'bookins',
  initialState: {
    bookins: [],
    success: false,
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // addFavorites
      .addCase(fetchAllBookinsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllBookinsThunk.fulfilled, (state, action) => {
        state.bookins = action.payload.autosFavoritos
        state.loading = false
      })
      .addCase(fetchAllBookinsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { } = bookinsSlice.actions

export default bookinsSlice.reducer