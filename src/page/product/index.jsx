import Navbar from '../../components/navbar';
import Header from '../../components/headerCreateProduct';
import ProductForm from '../../components/productForm';
import ProductList from '../../components/productList';
import React, { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../../redux/productSlice';

export default function CreateProduct(){
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [produkSedangEdit, setProdukSedangEdit] = useState(null); 
    const [editMode, setEditMode] = useState(false); 

    const tambahProduk = (dataProduk) => {
        dispatch(addProduct(dataProduk));
    };

    const hapusProduk = (id) => {
        dispatch(deleteProduct(id));
    };

    const editProduk = (id) => {
        const editedProduct = products.find(product => product.id === id); 
        setProdukSedangEdit(editedProduct);
        setEditMode(true); 
    };

    const simpanEditProduk = (editedProduct) => {
        dispatch(editProduct(editedProduct));
        setEditMode(false); 
        setProdukSedangEdit(null); 
    };

    return(
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
                                    produkSedangEdit={produkSedangEdit} 
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