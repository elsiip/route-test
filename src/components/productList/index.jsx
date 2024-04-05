import styles from "../../assets/css/styles.module.css";
import { Navigate } from 'react-router-dom'; // Import Navigate
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../../redux/actions';

function ProductList({ products, deleteProduct, editProduct, setEditMode, setProductEditing }) {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [productsEditing, setProductsEditing] = useState(null); 

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
    }
};

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value !== '') {
      const results = products.filter(product =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      dispatch(setEditMode(true));
      dispatch(setProductEditing(productToEdit));
    }
  };
  

  const handleProductClick = (id) => {
    window.location.href = `/${id}`;
  };

  return (
    <div>
      <section className="list" style={{ marginLeft: '22px', marginRight: '22px' }}>
        <div className="container-fluid">
          <div className="font text-center mt-3 mb-3">
            <h1 className="font-weight-medium color-primary fs-3">List Product</h1>
          </div>
          <table className="table table-striped" style={{ maxWidth: '950px' }}>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Category</th>
                <th scope="col">Image</th>
                <th scope="col">Product Freshness</th>
                <th scope="col">Product Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>
                    <button onClick={() => handleProductClick(product.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>{index + 1}</button>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td><img src={product.imageProduct} alt={product.productName} style={{ maxWidth: '100px' }} /></td>
                  <td>{product.productFreshness}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <button className="btn btn-danger me-2" onClick={() => handleDelete(product.id)}>Delete</button>
                    <button className="btn btn-success" onClick={() => handleEdit(product.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <button onClick={() => handleProductClick(product.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>{index + 1}</button>
                </td>
                <td>{product.productName}</td>
                <td>{product.productCategory}</td>
                <td><img src={product.imageProduct} alt={product.productName} style={{ maxWidth: '100px' }} /></td>
                <td>{product.productFreshness}</td>
                <td>{product.productPrice}</td>
                <td>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(product.id)}>Delete</button>
                  <button className="btn btn-success" onClick={() => handleEdit(product.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody> */}

          </table>
          <div style={{ marginTop: '-15px' }}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search By Product Name"
              className='bg-white'
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '194px', height: '31px' }}
            /><br />
            <div className="btn-group" role="group" style={{ height: 'auto', width: '135px' }}>
              <input type="radio" className="btn-check btn-hover-primary" name="deleteButton" id="deleteButton" autoComplete="off" checked />
              <label className="btn btn-outline-primary btn-hover-primary" htmlFor="deleteButton">Deletion</label>
              <input type="radio" className="btn-check" name="searchInput" id="searchInput" autoComplete="off" />
              <label className="btn btn-outline-primary text-center" htmlFor="searchInput">Search</label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = {
  deleteProduct,
  editProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);