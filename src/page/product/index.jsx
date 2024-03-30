import React, { useState, useEffect } from 'react';
import styles from "../../assets/css/styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/navbar';
import Header from '../../components/headerCreateProduct';
import ProductForm from '../../components/productForm';
import ProductList from '../../components/productList';
import ProductDetailPage from './productDetail';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import Routes and Route


export default function Product() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [productsEditing, setProductsEditing] = useState(null);
    const [productEditMode, setProductEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const addProduct = (product) => {
        const newProduct = { id: uuidv4(), ...product }; // Add ID using UUID
        setProducts([...products, newProduct]);
        updateLocalStorage([...products, newProduct]);
    };

    const deleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        // Update local storage
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const editProduct = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setProductsEditing(productToEdit);
        setProductEditMode(true);
    };

    const saveEditedProduct = (editedProduct) => {
        setProductEditMode(false);
        setProductsEditing(null);
    };

    const updateLocalStorage = (updatedProducts) => {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    return (
        <div className={styles['body']}>
            <Navbar />
            <section className="mt-5">
                <div className="container" style={{ maxWidth: '936px', height: 'auto' }}>
                    <div className="row justify-content-center">
                        <Header />
                        <div className="font col-xl-12 mt-5">
                            <div className="container" style={{ maxWidth: '656px', height: 'auto' }}>
                                <ProductForm onAddProduct={addProduct} productsEditing={productsEditing} productEditMode={productEditMode} saveEditedProduct={saveEditedProduct} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Routes>
                <Route path="/" element={<ProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct} setSelectedProduct={setSelectedProduct} />} />
                <Route path="/create-product/:id" element={<ProductDetailPage products={products} />} />
            </Routes>
        </div>
    );
}
