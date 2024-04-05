import { combineReducers } from 'redux';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, SET_EDIT_MODE, SET_PRODUCT_EDITING } from './actions'; // Import action types

const initialState = {
    products: [
      {
        id: "e7ce2b97-d0c1-4a75-9c1d-e6dfc8441836",
        productName: "John",
        productCategory: "Doe",
        productFreshness: "Doe",
        productPrice: "Doe",
        image: "Doe",
        additionalDescription: "Doe",
      },
    ],
    productEditMode: false,
    productEditing: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      case 'DELETE_PRODUCT':
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload),
        };
      case 'EDIT_PRODUCT':
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id ? { ...product, ...action.payload } : product
          ),
        };
      case 'SET_EDIT_MODE':
        return {
          ...state,
          productEditMode: action.payload,
        };
      case 'SET_PRODUCT_EDITING':
        return {
          ...state,
          productEditingId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  