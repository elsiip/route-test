import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage({ products }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Cari produk berdasarkan ID produk
        const foundProduct = products.find(product => product.id === id);
        setProduct(foundProduct);
    }, [id, products]); // Menambahkan ID dan products sebagai dependensi

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Product Detail</h2>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.productName}</p>
            <p><strong>Category:</strong> {product.productCategory}</p>
            <p><strong>Freshness:</strong> {product.productFreshness}</p>
            <p><strong>Price:</strong> {product.productPrice}</p>
        </div>
    );
}

export default ProductDetailPage;
