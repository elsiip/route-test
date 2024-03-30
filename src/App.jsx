import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './page/landing';
import Product from './page/product';

function App() {
  return (
    <div >
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-product" element={<Product />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;