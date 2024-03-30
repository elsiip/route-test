import React from 'react';
import styles from '../../assets/css/styles.module.css';
import { bottom } from '@popperjs/core';

function Footer() {
    return (
        <footer>
            <div className='container-fluid d-flex flex-column align-items-center justify-content-center' style={{background: '#F3F5FA', height:'239px'}}>
                <h1 className='fw-bold fs-4 text-center pt-2' style={{color: '#37517E'}}>Join Our Newsletter</h1>
                <p className="text-center pt-2" style={{color: '#444444'}}>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                <form action="/submit" method="post" className={styles['news-form']}>
                    <input type="email" className={styles['news-input']} name="email" id="email" />
                    <button type='submit' className={styles['subscribe-button']} >Subscribe</button>
                </form>
            </div>
            <div className="container-fluid bg-light" style={{height: '339.19px', padding: '60px 82px 30px 82px'}}>
                <div className='row'>
                    <div className='col-md-3 col-sm-6'>
                        <h1 className={styles['footer-h1']} style={{marginBottom: '10px'}}>ARSHA</h1>
                        <p className={styles['footer-p']}>A108 Adam Street</p>
                        <p className={styles['footer-p']}>New York, NY 535022</p>
                        <p className={styles['footer-p']}>United States</p>
                        <p className={styles['footer-p']}><b>Phone: </b>+1 5589 55488 55</p>
                        <p className={styles['footer-p']}><b>Email: </b>info@example.com</p>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                        <h2 className={styles['footer-h2']}>Useful Links</h2>
                        <div className="d-flex flex-column">
                            <a className={styles['footer-a']} href="#">Home</a>
                            <a className={styles['footer-a']} href="#">About us</a>
                            <a className={styles['footer-a']} href="#">Services</a>
                            <a className={styles['footer-a']} href="#">Terms of service</a>
                            <a className={styles['footer-a']} href="#">Privacy policy</a>
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                        <h2 className={styles['footer-h2']}> Our Services</h2>
                        <div className="d-flex flex-column">
                            <a className={styles['footer-a']} href="#">Web Design</a>
                            <a className={styles['footer-a']} href="#">Web Development</a>
                            <a className={styles['footer-a']} href="#">Product Management</a>
                            <a className={styles['footer-a']} href="#">Marketing</a>
                            <a className={styles['footer-a']} href="#">Graphic Design</a>
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                        <h2 className={styles['footer-h2']}>Our Social Network</h2>
                        <p className={styles['desc1']}>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                        <div className="d-flex">
                            <div className={styles['circle']}></div>
                            <div className={styles['circle']}></div>
                            <div className={styles['circle']}></div>
                            <div className={styles['circle']}></div>
                            <div className={styles['circle']}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid m-0" style={{backgroundColor: '#37517E', height: "81px", width: 'auto'}}>
                <div className="row d-flex justify-content-between align-items-center" style={{padding: '0 81px 0 81px'}}>
                    <div className='col-md-9'>
                        <p className='fs-6 fw-normal text-white' style={{paddingTop :'30px', lineHeight: '21px'}}>&copy; Copyright <b>Arsha</b>. All Rights Reserved</p>
                    </div>
                    <div className='col-md-3'>
                        <p className='fs-6 fw-normal text-white' style={{paddingTop :'30px', lineHeight: '21px'}}>Designed by <span style= {{color: '#47b2e4'}}>BootstrapMade</span></p>
                    </div>
                </div>
            </div>


        </footer>
    );
}

export default Footer;
