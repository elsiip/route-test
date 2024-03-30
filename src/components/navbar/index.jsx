import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../assets/css/styles.module.css";

export default function Navbar() {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isCreateProductActive = location.pathname === "/create-product";

  return (
    <div>
      <div className={styles.header}>
        <nav className="navbar navbar-expand-lg bg-white w-auto" style={{ boxShadow: '0px 1px 8px 0px #00000033' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{fontWeight: '500', fontSize: '24px'}}>Simple Header</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className={isHomeActive ? "btn btn-primary" : "btn text-primary"} style={{fontWeight: '500', fontSize: '16px'}} to="/">Home</NavLink>
                <NavLink className={isCreateProductActive ? "btn btn-primary" : "btn text-primary"} style={{fontWeight: '500', fontSize: '16px'}} to="/create-product">Create Product</NavLink>
                <NavLink className="btn text-primary" style={{fontWeight: '500', fontSize: '16px'}} to="/features">Features</NavLink>
                <NavLink className="btn text-primary" style={{fontWeight: '500', fontSize: '16px'}} to="/pricing">Pricing</NavLink>
                <NavLink className="btn text-primary" style={{fontWeight: '500', fontSize: '16px'}} to="/faqs">FAQs</NavLink>
                <NavLink className="btn text-primary" style={{fontWeight: '500', fontSize: '16px'}} to="/about">About</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
