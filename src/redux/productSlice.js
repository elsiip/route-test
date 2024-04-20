import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const productSlice = createSlice({
    name: 'products',
    initialState : {
        products: [
            {
                id: uuidv4(),   
                productName: "John",       
                productCategory: "Doe",        
                productFreshness: "Doe",        
                productPrice: "Doe",        
                image: "Doe",        
                additionalDescription: "Doe",      
            }
        ]        
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        editProduct: (state, action) => {
            state.products = state.products.map(product =>
                product.id === action.payload.id ? action.payload : product
            );
        },
    },
});
    
export const { addProduct, deleteProduct, editProduct } = productSlice.actions;
    
export default productSlice.reducer;