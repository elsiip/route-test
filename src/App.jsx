import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Tambahkan import Provider
import store from './redux/store'; // Tambahkan import store Redux
import LandingPage from './page/landing';
import Product from './page/product';
import ProductDetail from './page/product/productDetail';
import Login from './page/login';
import Register from './page/register';

function App() {
  return (
    <div>
      <Provider store={store}> {/* Tambahkan Provider */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-product" element={<Product />} />
            <Route path="/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
