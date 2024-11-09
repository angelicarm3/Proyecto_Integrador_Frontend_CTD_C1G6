import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Función para asignar rol de administrador
export const assignAdminRole = createAsyncThunk(
  'adminUsers/assignAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://yourapi.com/users/${userId}/assign-admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Función para quitar rol de administrador
export const removeAdminRole = createAsyncThunk(
  'adminUsers/removeAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://yourapi.com/users/${userId}/remove-admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Función para eliminar usuario
export const deleteUserThunk = createAsyncThunk(
  'adminUsers/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://yourapi.com/users/${userId}`);
      return response.data; // Devuelve los datos del usuario eliminado
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Obtener todos los usuarios
export const fetchAllUsersAdminThunk = createAsyncThunk(
  'adminUsers/fetchAllUsersAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/users/list');
      return response.data;
    } catch (error) {
      return rejectWithValue('Error al obtener los datos');
    }
  }
);

export const adminUserSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: false,
    itemsToShow: 10,
    currentPage: 1,
    selectedUser: null,
  },
  reducers: {
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload;
      state.currentPage = 1; // Reiniciar la página cuando cambia el número de items
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchAllUsersAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersAdminThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.selectedUser = null;
        state.loading = false;
      })
      .addCase(fetchAllUsersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener usuarios';
      });

    // Asignar rol de admin
    builder.addCase(assignAdminRole.fulfilled, (state, action) => {
      const updatedUser = state.users.find((user) => user.id === action.payload.id);
      if (updatedUser) {
        updatedUser.esAdmin = 'admin'; // Actualiza el rol del usuario en el estado
      }
    });

    // Eliminar rol de admin
    builder.addCase(removeAdminRole.fulfilled, (state, action) => {
      const updatedUser = state.users.find((user) => user.id === action.payload.id);
      if (updatedUser) {
        updatedUser.esAdmin = 'user'; // Actualiza el rol del usuario en el estado
      }
    });

    // Eliminar usuario
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id); // Elimina el usuario del estado
    });
  },
});

// Exportar acciones
export const { setItemsToShow, setPage, setSelectedUser, resetStatus } = adminUserSlice.actions;

// Exportar reducer
export default adminUserSlice.reducer;