import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../assets/css/styles.module.css';
import { useState } from 'react';

export default function Header() {
  return (
    <section className={styles['hero']}>
      <div className={styles['hero-container']}>
        <div className='row d-flex justify-content-center align-items-center text-white'>
          <div className='col-md-5'>
            <h1 className='m-0' style={{fontSize: '48px', fontWeight: '700', lineHeight:'56px'}}>Better Solutions For Your Business</h1>
            <p className='m-0' style={{fontSize: '24px', fontWeight: '500', lineHeight:'28.8px', color:'#AFB9CB'}}>Find your best trip ever</p>
            <a href="#"><button className='me-5' style={{fontSize: '16px', fontWeight:'500', lineHeight:"24px"}}>Get Started</button></a>
            <a href="#" style={{fontSize: '16px', textDecoration: 'none', fontWeight: '400', lineHeight: '16px'}} className='text-white'>Watch Video</a>
          </div>
          <img src="https://i.ibb.co/2ZW68gB/hero-img.png" alt="hero-img" style={{width: '636px', top:'527px'}} />
        </div>
      </div>
    </section>
  );
};
