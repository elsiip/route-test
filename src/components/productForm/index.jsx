import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../assets/css/styles.module.css";
import {v4 as uuidv4} from  'uuid'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct, deleteProduct, setEditMode } from '../../redux/actions';

function ProductForm({ addProduct, editProduct, productEditMode, productEditing}) {
    const dispatch = useDispatch();
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
    const [productsEditing, setProductsEditing] = useState(false);

    const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Exploration, number 1
    let isValid = true;
    let selectedFreshness = false; // Menyimpan status apakah opsi kesegaran dipilih

    for (let key in form.elements) {
        if (form.elements[key].nodeName === 'INPUT' || form.elements[key].nodeName === 'SELECT' || form.elements[key].nodeName === 'TEXTAREA') {
            const input = form.elements[key];
            if (input.value.trim() === '' || (input.nodeName === 'SELECT' && input.value === 'Choose...')) {
                isValid = false;
                input.classList.add('is-invalid');
                if (input.name === 'productName') {
                    setProductNameError('Please enter a valid product name.');
                } else if (input.name === 'productCategory') {
                    setProductCategoryError('Please select a product category.');
                } else if (input.name === 'productPrice') {
                    setProductPriceError('Please enter a valid price in the format xx.xx.');
                } else if (input.name === 'addDesc') {
                    setAddDescError('Please enter additional description.');
                }
            } else {
                input.classList.remove('is-invalid');
                if (input.name === 'productName') {
                    setProductNameError('');
                } else if (input.name === 'productCategory') {
                    setProductCategoryError('');
                } else if (input.name === 'productPrice') {
                    setProductPriceError('');
                } else if (input.name === 'addDesc') {
                    setAddDescError('');
                }
            }

            // Check if a freshness option is selected
            if (input.name === 'productFreshness' && input.checked) {
                selectedFreshness = true;
            }
        }
    }

    // Validation for image input
    const imageInput = form.elements['imageProduct'];
    if (!imageInput.files[0]) {
        isValid = false;
        setImageProductError('Please select an image.'); // Pesan error jika gambar tidak dipilih
        imageInput.classList.add('is-invalid'); // Tambahkan kelas untuk border merah
    } else {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(imageInput.value)) {
            isValid = false;
            setImageProductError('Please upload an image with JPG, JPEG, or PNG format.'); // Pesan error jika format gambar tidak valid
            imageInput.classList.add('is-invalid'); // Tambahkan kelas untuk border merah
        } else {
            setImageProductError('');
            imageInput.classList.remove('is-invalid'); // Hapus kelas untuk border merah jika valid
        }
    }

    // Check if a freshness option is selected
    if (!selectedFreshness) {
        isValid = false;
        setProductFreshnessError('Please select the freshness of the product.'); // Pesan error jika tidak ada opsi kesegaran yang dipilih
    } else {
        setProductFreshnessError('');
    }

    // If form is valid, proceed with form submission
    if (isValid) {
        const productId = uuidv4();
        const product = {
            id: productId,
            productName: form['productName'].value,
            productCategory: form['productCategory'].value,
            imageProduct: imageProduct,
            productFreshness: form['productFreshness'].value,
            addDesc: form['addDesc'].value,
            productPrice: form['productPrice'].value,
        };
        console.log('Product data:', product)
        // Call the prop onAddProduct and pass the product data
        // onAddProduct(product);
        if (productEditMode) {
            editProduct(product);
        } else {
            addProduct(product);
        }
        
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

    useEffect(() => {
        const imageInput = document.getElementById('imageProduct');

        const handleImageChange = () => {
            const allowedExtensions = /\.(jpg|jpeg|png)$/i;
            if (!allowedExtensions.test(imageInput.value)) {
                setImageProductError('Please upload an image with JPG, JPEG, or PNG format.'); // Set error message if format is invalid
                imageInput.classList.add('is-invalid'); // Add is-invalid class to display red border
            } else {
                setImageProductError('');
                imageInput.classList.remove('is-invalid'); // Remove is-invalid class if format is valid
            }
        };

        imageInput.addEventListener('change', handleImageChange);

        // Clean up the event listener
        return () => {
            imageInput.removeEventListener('change', handleImageChange);
        };
    }, [imageProduct]);

    const handleEditClick = () => {
        // Dispatch action to set edit mode and populate form fields with product data
        dispatch(setEditMode(true));
        // You may need to dispatch an action to populate form fields with product data
      };
    
      // Function to handle delete button click
      const handleDeleteClick = () => {
        // Dispatch action to delete product
        dispatch(deleteProduct(productsEditing.id));
        // Reset form or clear form fields
      };
    
      useEffect(() => {
        // Populate form fields with product data when editing mode is active
        if (productEditMode && productEditing) {
            setProductName(productEditing.productName || ''); // Pastikan untuk menambahkan default value ''
            setProductCategory(productEditing.productCategory || ''); // Pastikan untuk menambahkan default value ''
            setProductFreshness(productEditing.productFreshness || ''); // Pastikan untuk menambahkan default value ''
            setAddDesc(productEditing.addDesc || ''); // Pastikan untuk menambahkan default value ''
            setProductPrice(productEditing.productPrice || ''); // Pastikan untuk menambahkan default value ''
        }
    }, [productEditMode, productEditing]);
    
    


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
                            <input type="file" className="form-control " id="imageProduct" data-name="Image Product" name='imageProduct' onChange={(e) => setImageProduct(e.target.files[0])} required />
                        </div>
                        {imageProductError && <div className="text-danger">{imageProductError}</div>}
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="" className="font-weight-normal text-form color-primary mt-2 mb-2">Product Freshness</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="productFreshness" id="brandNew" value="Brand New" onChange={(e) => setProductFreshness(e.target.value)}  required />
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
                            {addDescError && <div className="text-danger">{addDescError}</div>}
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

const mapDispatchToProps = {
    addProduct,
    editProduct,
    deleteProduct,
};

const mapStateToProps = (state) => ({
    productsEditing: state.productsEditing // Retrieve productsEditing from Redux state
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);