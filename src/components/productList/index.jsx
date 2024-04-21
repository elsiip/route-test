import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios

function ProductList({produk, hapusProduk, editProduk }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState(produk); // State untuk menyimpan data produk
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6624041b04457d4aaf9b7041.mockapi.io/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [produk]); // Fetch data only once when component mounts

  const konfirmasiHapus = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`https://6624041b04457d4aaf9b7041.mockapi.io/products/${id}`);
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        alert("Produk berhasil dihapus");
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus produk");
      }
    }
  };

  const handleEdit = (id) => {
    editProduk(id); // Memanggil fungsi editProduk dengan ID produk sebagai argumen
  };

  if (!products) {
    return <div>Loading...</div>;
  }

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
              {products.map((product, index) => ( // Gunakan products untuk membuat daftar produk
                <tr key={product.id}>
                  <td>
                    <button onClick={() => navigate(`/product/${product.id}`)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>{index + 1}</button>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td>
                    <img src={product.imageProduct} alt={product.productName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </td>
                  <td>{product.productFreshness}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <button type="button" className="btn btn-danger me-2" onClick={() => konfirmasiHapus(product.id)}>Delete</button>
                    <button type="button" className="btn btn-success" onClick={() => editProduk(product.id)}>Edit</button>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
