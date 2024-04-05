import React from 'react';
import styles from "../../assets/css/styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/navbar';
import Header from '../../components/headerCreateProduct';
import ProductForm from '../../components/productForm';
import ProductList from '../../components/productList';
import { connect } from 'react-redux';
import { addProduct, deleteProduct, editProduct, setEditMode, setProductEditing } from '../../redux/actions'; // Import action creators

function Product({ products, addProduct, deleteProduct, editProduct, productEditMode, productsEditing, setEditMode, setProductEditing }) {
    return (
        <div className={styles['body']}>
            <Navbar />
            <section className="mt-5">
                <div className="container" style={{ maxWidth: '936px', height: 'auto' }}>
                    <div className="row justify-content-center">
                        <Header />
                        <div className="font col-xl-12 mt-5">
                            <div className="container" style={{ maxWidth: '656px', height: 'auto' }}>
                                <ProductForm addProduct={addProduct} editProduct={editProduct} productEditMode={productEditMode} productEditing={productsEditing} /> {/* Pass productsEditing to ProductForm */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct} setEditMode={setEditMode} setProductEditing={setProductEditing} /> {/* Pass setEditMode and setProductEditing to ProductList */}
        </div>
    );
}

const mapStateToProps = (state) => ({
    products: state.products,
    productEditMode: state.productEditMode,
    productsEditing: state.productsEditing // Retrieve productsEditing from Redux state
});

const mapDispatchToProps = {
    addProduct,
    deleteProduct,
    editProduct,
    setEditMode, // Include setEditMode action creator
    setProductEditing // Include setProductEditing action creator
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
