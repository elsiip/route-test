import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Ambil produk dari localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        
        if (storedProducts) {
            // Cari produk berdasarkan ID produk
            const foundProduct = storedProducts.find(product => product.id === id);
            setProduct(foundProduct);
        }
    }, [id]); // Hanya menggunakan ID sebagai dependensi

    if (!product) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <h2 className="mt-5 mb-3">Product Detail</h2>
            <div className="card">
                <div className="card-body">
                    <p className="card-text"><strong>ID:</strong> {product.id}</p>
                    <p className="card-text"><strong>Name:</strong> {product.productName}</p>
                    <p className="card-text"><strong>Category:</strong> {product.productCategory}</p>
                    <p className="card-text"><strong>Additional Description:</strong> {product.addDesc}</p>
                    <p className="card-text"><strong>Freshness:</strong> {product.productFreshness}</p>
                    <p className="card-text"><strong>Price:</strong> {product.productPrice}</p>
                </div>
                <div className="card-footer">
                    {/* Tambahkan tombol kembali ke halaman create product */}
                    <Link to="/create-product" className="btn btn-primary">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
