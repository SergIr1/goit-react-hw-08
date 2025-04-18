import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    data: null,
  },
  reducers: {
    openEditModal(state, action) {
      state.isOpen = true;
      state.type = 'edit';
      state.data = action.payload;
    },
    openDeleteModal(state, action) {
      state.isOpen = true;
      state.type = 'delete';
      state.data = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.data = null;
    },
  },
});

// export const { openModal, closeModal } = modalSlice.actions;
export const { openEditModal, openDeleteModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
