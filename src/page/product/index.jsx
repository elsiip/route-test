import Navbar from '../../components/navbar';
import axios from 'axios';
import Header from '../../components/headerCreateProduct';
import ProductForm from '../../components/productForm';
import ProductList from '../../components/productList';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setProductSedangEdit, setEditMode } from '../../redux/productSlice';

export default function CreateProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [productsSedangEdit, setProdukSedangEdit] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
    
        return () => clearInterval(intervalId);
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('https://6624041b04457d4aaf9b7041.mockapi.io/products');
          dispatch(setProducts(response.data));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
      const tambahProduk = async (dataProduk) => {
        try {
          const response = await axios.post('https://6624041b04457d4aaf9b7041.mockapi.io/products', dataProduk);
          dispatch(setProducts([...products, response.data]));
          alert('Product added successfully!');
          fetchData();
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again later.');
        }
    };

    const hapusProduk = async (id) => {
        try {
          await axios.delete('https://6624041b04457d4aaf9b7041.mockapi.io/products/${id}');
          const newProducts = products.filter(product => product.id !== id);
          dispatch(setProducts(newProducts));
          alert('Product deleted successfully!');
          fetchData();
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again later.');
        }
      };

    const editProduk = (id) => {
        const editedProduct = products.find(product => product.id === id);
        setProdukSedangEdit(editedProduct);
        setEditMode(true);
    };

    const simpanEditProduk = async (editedProduct) => {
        try {
            await axios.put(`https://6624041b04457d4aaf9b7041.mockapi.io/products/${editedProduct.id}`, editedProduct);
            dispatch(editProduct(editedProduct)); // Mengirim tindakan editProduct ke redux store
            alert("Produk berhasil diubah");
            setEditMode(false);
            setProdukSedangEdit(null);
        } catch (error) {
            console.error(error);
            alert("Produk gagal diubah");
        }
    };

    return (
        <div>
            <Navbar />
            <section className="mt-5">
                <div className="container" style={{ maxWidth: '936px', height: 'auto' }}>
                    <div className="row justify-content-center">
                        <Header />
                        <div className="font col-xl-12 mt-5">
                            <div className="container" style={{ maxWidth: '656px', height: 'auto' }}>
                                <ProductForm
                                    tambahProduk={tambahProduk}
                                    editMode={editMode}
                                    productsSedangEdit={productsSedangEdit}
                                    simpanEditProduk={simpanEditProduk}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProductList
                products={products}
                hapusProduk={hapusProduk}
                editProduk={editProduk}
            />
        </div>
    )
}
