import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../assets/css/styles.module.css";
import {v4 as uuidv4} from  'uuid'

export default function ProductForm({ onAddProduct, productsEditing, productEditMode, SaveEditProduct}) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [productFreshness, setProductFreshness] = useState('');
    const [addDesc, setAddDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productNameError, setProductNameError] = useState('');
    const [productCategoryError, setProductCategoryError] = useState('');
    const [imageProductError, setImageProductError] = useState('');
    const [productFreshnessError, setProductFreshnessError] = useState('');
    const [addDescError, setAddDescError] = useState('');
    const [productPriceError, setProductPriceError] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Exploration, number 1
    let isValid = true;
    for (let key in form.elements) {
        if (form.elements[key].nodeName === 'INPUT' || form.elements[key].nodeName === 'SELECT' || form.elements[key].nodeName === 'TEXTAREA') {
            const input = form.elements[key];
            if (input.value.trim() === '' || (input.nodeName === 'SELECT' && input.value === 'Choose...')) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }

            if (input.type === 'email') {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('is-invalid');
                }
            }
        }
    }

    // If form is valid, proceed with form submission
    if (isValid) {
        const productId = uuidv4();
        const product = {
            id: productId,
            productName: form['productName'].value,
            productCategory: form['productCategory'].value,
            productFreshness: form['productFreshness'].value,
            addDesc: form['addDesc'].value,
            productPrice: form['productPrice'].value,
        };
        console.log('Product data:', product)
        // Call the prop onAddProduct and pass the product data
        onAddProduct(product);

        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = [...storedProducts, product];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        // Reset the form after submission
        form.reset();
    }
};

    //Priority 2
    const handleProductNameChange = (event) => {
        const value = event.target.value;
        setProductName(value);
    
        if (value.length > 25) {
            alert('Product name cannot exceed 25 characters');
            setProductNameError('Product name cannot exceed 25 characters');
        } else if (value.length > 10) {
            setProductNameError('Product name cannot exceed 10 characters');
        } else if (value.length === 0) {
            // Validasi jika field kosong
            setProductNameError('Please enter a valid product name.');
        } else {
            setProductNameError('');
        }
    };

    // Priority 1, Number 1
    const handleButtonClick = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
        console.log('Random number:', randomNumber);
    };

    //Eksplorasi gagal
    useEffect(() => {
        if (productEditMode && productsEditing) {
            setProductName(productsEditing.productName);
            setProductCategory(productsEditing.productCategory);
            setImageProduct(productsEditing.imageProduct);
            setProductFreshness(productsEditing.productFreshness);
            setAddDesc(productsEditing.addDesc);
            setProductPrice(productsEditing.productPrice);
        }
    }, [productEditMode, productsEditing]);


    return (
        <div>
            <h3 className="font-weight-medium color-primary">Detail Product</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row">
                    <div className="form-group" style={{ width: '300px' }}>
                        <label htmlFor="productName" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Name</label>
                        <input type="text" className="form-control" id="productName" name="productName" value={productName} onChange={handleProductNameChange} required />
                        {productNameError && <div className="text-danger">{productNameError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCategory" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Category</label>
                        <select className="form-select mb-3" id="productCategory" name="productCategory" style={{ width: '244px', height: '38px' }}>
                            <option selected value="Choose...">Choose...</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Toys">Toys</option>
                        </select>
                        {productCategoryError && <div className="text-danger">{productCategoryError}</div>}
                    </div>
                    <div className="col-sm-7 mb-3">
                        <label htmlFor="inputGroupFile" className="form-label">Image of Product</label>
                        <div className="input-group custom-file-button">
                            {/* <label htmlFor="inputGroupFile" className="input-group-text bg-primary text-white">Choose File</label> */}
                            <input type="file" className="form-control border border-1 border-primary" id="imageProduct" data-name="Image Product" name='imageProduct' required />
                            {imageProductError && <div className="text-danger">{imageProductError}</div>}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Freshness</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="brandNew" value="Brand New" required />
                                <label className="form-check-label" htmlFor="productFreshness">
                                    Brand New
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="secondHand" value="Second Hand" required />
                                <label className="form-check-label" htmlFor="productFreshness">
                                    Second hand
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="refurbished" value="Refurbished" required />
                                <label className="form-check-label" htmlFor="productFreshness">
                                    Refurbished
                                </label>
                            </div>
                            {productFreshnessError && <div className="text-danger">{productFreshnessError}</div>}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="addDesc" className="font-weight-normal text-form color-primary mt-2 mb-2">Additional Description</label>
                            <textarea name="addDesc" className="form-control" id="addDesc" style={{ width: '603px', height: '116px' }} required></textarea>
                            {imageProductError && <div className="text-danger">{imageProductError}</div>}
                        </div>
                    </div>
                    <div className="form-group" style={{ width: '300px' }}>
                        <label htmlFor="productPrice" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Price</label>
                        <input type="text" className="form-control" id="productPrice" name='productPrice' style={{ width: '603px' }} placeholder="$1" required />
                        {productPriceError && <div className="text-danger">{productPriceError}</div>}
                    </div>
                    <div className="text-center d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-create font-weight-normal" style={{ marginTop: '113px', width: '600px', height: '48px' }}>Submit</button>
                    </div>

                    {/* Priority 1, Number 1 */}
                    <div className="text-center d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary my-4" onClick={handleButtonClick} style={{ width: '600px', height: '48px' }}>Generate Random Number</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
