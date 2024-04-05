// actions.js

// Action Types
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_EDIT_MODE = 'SET_EDIT_MODE'; // Tambahkan action type untuk setEditMode
export const SET_PRODUCT_EDITING = 'SET_PRODUCT_EDITING'; // Tambahkan action type untuk setProductEditing

// Action Creators
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});

export const setEditMode = (mode) => ({ // Action creator untuk mengatur mode edit
  type: SET_EDIT_MODE,
  payload: mode,
});

export const setProductEditing = (productId) => ({ // Action creator untuk menyimpan ID produk yang sedang diedit
  type: SET_PRODUCT_EDITING,
  payload: productId,
});
