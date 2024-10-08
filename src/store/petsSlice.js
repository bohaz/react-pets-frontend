import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPets, addPet, updatePet, deletePet } from '../api';

const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetPets: (state) => {
      state.pets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPetsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPetsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPetAsync.fulfilled, (state, action) => {
        state.pets.push(action.payload);
      })
      .addCase(updatePetAsync.fulfilled, (state, action) => {
        const index = state.pets.findIndex(pet => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      .addCase(deletePetAsync.fulfilled, (state, action) => {
        state.pets = state.pets.filter(pet => pet.id !== action.payload);
      });
  },
});

// Asynchronous thunks
export const fetchPetsAsync = createAsyncThunk('pets/fetchPets', fetchPets);
export const addPetAsync = createAsyncThunk('pets/addPet', addPet);
export const updatePetAsync = createAsyncThunk('pets/updatePet', updatePet);
export const deletePetAsync = createAsyncThunk('pets/deletePet', deletePet);

export const { resetPets } = petsSlice.actions;

export default petsSlice.reducer;
