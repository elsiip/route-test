import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios

function ProductForm({ tambahProduk, produkSedangEdit, editMode, simpanEditProduk }) {
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productFreshness: '',
        productPrice: '',
        imageProduct: null,
        additionalDescription: ''
    });

    const [productNameError, setProductNameError] = useState('');
    const [productCategoryError, setProductCategoryError] = useState('');
    const [imageProductError, setImageProductError] = useState('');
    const [productFreshnessError, setProductFreshnessError] = useState('');
    const [addDescError, setAddDescError] = useState('');
    const [productPriceError, setProductPriceError] = useState('');

    useEffect(() => {
        if (produkSedangEdit) {
            setFormData(produkSedangEdit);
        }
    }, [produkSedangEdit]);

    useEffect(() => {
        fetchImageProduct();
    }, []);

    const fetchImageProduct = async () => {
        try {
            const response = await fetch('https://6624041b04457d4aaf9b7041.mockapi.io/products');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * response.data.length);
            const randomProduct = response.data[randomIndex];
            setFormData(prevState => ({
                ...prevState,
                productImage: randomProduct.productImage 
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        const nameRegex = /^[a-zA-Z0-9\s]+$/;
        const priceRegex = /^\d+(\.\d{1,2})?$/;

        if (name === 'productName') {
            if (!nameRegex.test(value)) {
                setProductNameError('Product Name must contain only letters, numbers, and spaces.');
            } else if (value.length > 25) {
                setProductNameError('Product Name must not exceed 25 characters.');
            } else if (value.length > 10) {
                setProductNameError('Product Name must not exceed 10 characters.');
            } else if (value === '') {
                setProductNameError('Please enter a valid product name.');
            } else {
                setProductNameError('');
            }
        }

        if (name === 'productPrice') {
            if (!priceRegex.test(value)) {
                setProductPriceError('Please enter a valid price.');
            } else {
                setProductPriceError('');
            }
        }

        if (name === 'productCategory') {
            if (value === '') {
                setProductCategoryError('Please select a product category.');
            } else {
                setProductCategoryError('');
            }
        }

        if (name === 'productFreshness') {
            if (value === '') {
                setProductFreshnessError('Please select a product freshness.');
            } else {
                setProductFreshnessError('');
            }
        }
        if (name === 'addDesc') {
            if (value.length > 100) {
                setAddDescError('Additional Description must not exceed 100 characters.');
            } else {
                setAddDescError('');
            }
        }
        if (name === 'imageProduct') {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!allowedExtensions.test(files[0].name)) {
                setImageProductError('Please upload an image with JPG, JPEG, or PNG format.');
            } else {
                setImageProductError('');
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }

        if (name === 'imageProduct') {
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    imageProduct: reader.result // Store the data URL in formData
                }));
            };
    
            if (file) {
                reader.readAsDataURL(file); // Convert the file to a data URL
            }
        }

        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (formData.productName === '') {
            errors.productName = 'Please enter a valid product name.';
        }
        if (!formData.productCategory) {
            errors.productCategory = 'Please select a product category.';
        }
        if (!formData.productFreshness) {
            errors.productFreshness = 'Please select a product freshness.';
        }
        if (!formData.imageProduct) {
            errors.imageProduct = 'Please upload an image.';
        }
        if (formData.productPrice === '') {
            errors.productPrice = 'Please enter a valid price.';
        }
        if (formData.addDesc === '') {
            errors.addDesc = 'Please enter additional description.';
        }

        if (Object.keys(errors).length > 0) {
            setProductNameError(errors.productName || '');
            setProductCategoryError(errors.productCategory || '');
            setProductFreshnessError(errors.productFreshness || '');
            setImageProductError(errors.imageProduct || '');
            setProductPriceError(errors.productPrice || '');
            setAddDescError(errors.addDesc || '');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('productCategory', formData.productCategory);
        formDataToSend.append('productFreshness', formData.productFreshness);
        formDataToSend.append('productPrice', formData.productPrice);
        formDataToSend.append('imageProduct', formData.imageProduct);
        formDataToSend.append('addDesc', formData.addDesc);

        if (editMode) {
            simpanEditProduk(formData);
        } else {
            try {
                await axios.post('https://6624041b04457d4aaf9b7041.mockapi.io/products', formData);
                alert("Data submitted successfully");
                setFormData({
                    productName: '',
                    productCategory: '',
                    productFreshness: '',
                    addDesc: '',
                    productPrice: '',
                    imageProduct: null
                });

                // Reset all errors
                setProductNameError('');
                setProductCategoryError('');
                setProductFreshnessError('');
                setImageProductError('');
                setProductPriceError('');
                setAddDescError('');
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }
    };


    const handleButtonClick = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        console.log('Random number:', randomNumber);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Update your state here with the file or the data URL of the image
            setFormData({ ...formData, productImage: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h3 className="font-weight-medium color-primary">Detail Product</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidat encType='multipart/form-data'>
                <div className="row">
                    <div className="form-group" style={{ width: '300px' }}>
                        <label htmlFor="productName" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Name</label>
                        <input type="text" className={`form-control ${productNameError ? 'is-invalid' : ''}`} id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
                        {productNameError && <div className="text-danger">{productNameError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCategory" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Category</label>
                        <select className={`form-select mb-3 ${productCategoryError ? 'is-invalid' : ''}`} id="productCategory" name="productCategory" style={{ width: '244px', height: '38px' }} value={formData.productCategory} onChange={handleChange} required >
                            <option>Choose...</option>
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
                            <input type="file" className={`form-control ${imageProductError ? 'is-invalid' : ''}`} id="imageProduct" data-name="Image Product" name='imageProduct' onChange={handleChange} required />
                        </div>
                        {imageProductError && <div className="text-danger">{imageProductError}</div>}
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Freshness</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="brandNew" value="Brand New" checked={formData.productFreshness === 'Brand New'} onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="brandNew">
                                    Brand New
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="secondHand" value="Second Hand" checked={formData.productFreshness === 'Second Hand'} onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="secondHand">
                                    Second Hand
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="refurbished" value="Refurbished" checked={formData.productFreshness === 'Refurbished'} onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="refurbished">
                                    Refurbished
                                </label>
                            </div>
                            {productFreshnessError && <div className="text-danger">{productFreshnessError}</div>}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="addDesc" className="font-weight-normal text-form color-primary mt-2 mb-2">Additional Description</label>
                            <textarea name="addDesc" className={`form-control ${addDescError ? 'is-invalid' : ''}`} id="addDesc" style={{ width: '603px', height: '116px' }} value={formData.addDesc} onChange={handleChange} required></textarea>
                            {addDescError && <div className="text-danger">{addDescError}</div>}
                        </div>
                    </div>
                    <div className="form-group" style={{ width: '300px' }}>
                        <label htmlFor="productPrice" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Price</label>
                        <input type="text" className={`form-control ${productPriceError ? 'is-invalid' : ''}`} id="productPrice" name='productPrice' style={{ width: '603px' }} placeholder="$1" value={formData.productPrice} onChange={handleChange} required />
                        {productPriceError && <div className="text-danger">{productPriceError}</div>}
                    </div>
                    <div className="text-center d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-create font-weight-normal" style={{ marginTop: '113px', width: '600px', height: '48px' }}>Submit</button>
                    </div>
                </div>
            </form>
            <div className="text-center d-flex justify-content-center">
                <button type="button" className="btn btn-secondary my-4" onClick={handleButtonClick} style={{ width: '600px', height: '48px' }}>Generate Random Number</button>
            </div>
        </div>
    );
}

export default ProductForm;
