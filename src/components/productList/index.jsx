import React, { useState } from 'react';  // Tambahkan useState
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList({ products, hapusProduk, editProduk }){
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // 1. Tambahkan state untuk nilai inputan pencarian

  const konfirmasiHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        hapusProduk(id);
    }
  };

  const handleEdit = (id) => {
    editProduk(id);
  };

  // 3. Modifikasi logika rendering untuk memfilter daftar produk berdasarkan pencarian
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <th scope="col">Product Image</th>
                <th scope="col">Product Freshness</th>
                <th scope="col">Product Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={uuidv4()}>
                  <td>
                    <button onClick={() => navigate(`/product/${product.id}`)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>{index + 1}</button>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.imageProduct}</td>
                  <td>{product.productFreshness}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <button type="button" className="btn btn-danger me-2" onClick={() => konfirmasiHapus(product.id)}>Delete</button>
                    <button type="button" className="btn btn-success" onClick={() => handleEdit(product.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '-15px' }}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search By Product Name"
              className='bg-white'
              style={{ width: '194px', height: '31px' }}
              value={searchTerm} // 2. Menghubungkan inputan dengan state
              onChange={(e) => setSearchTerm(e.target.value)} // 2. Tambahkan fungsi untuk menangani perubahan inputan
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

export default ProductList;
