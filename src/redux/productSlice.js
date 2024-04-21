import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productSedangEdit: null,
    editMode: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductSedangEdit: (state, action) => {
      state.productSedangEdit = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const { setProducts, setProductSedangEdit, setEditMode } = productSlice.actions;

export default productSlice.reducer;
