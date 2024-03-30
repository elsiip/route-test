import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap'; // Import Bootstrap's Carousel component

function CarouselComponent() {
    useEffect(() => {
        // Initialize the carousel when the component mounts
        const carouselElement = document.querySelector('.carousel');
        new Carousel(carouselElement);
    }, []);

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" style={{height: "450px"}}>
                    <img src="https://www.marketeers.com/_next/image/?url=https%3A%2F%2Fimagedelivery.net%2F2MtOYVTKaiU0CCt-BLmtWw%2F55bbd799-390b-45d2-d819-c1062cf46500%2Fw%3D1920&w=1920&q=75" className="d-block w-100" alt="carousel 1"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className='fs-3 fw-bold' style={{color: '#37517E'}}>Grow Your Business</h5>
                        <p>Unlock your business potential with our cutting-edge solutions.</p>
                    </div>
                </div>
                <div className="carousel-item" style={{height: "450px"}}>
                    <img src="https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fbusiness-name-traits.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5898&fp-y=0.4486&h=415&q=88&w=622&s=91389d8d0c049b74818a5932e188c81e" className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className='fs-3 fw-bold' style={{color: '#37517E'}}>Drive Sales</h5>
                        <p>Boost your revenue and drive sales with our innovative strategies.</p>
                    </div>
                </div>
                <div className="carousel-item" style={{height: "450px"}}>
                    <img src="https://www.chase.com/content/dam/structured-images/chase-ux/inline-media/business/knowledge-center/start/what-is-unique-entity-identifier-uei-number.jpg" className="d-block w-100" alt="Carousel 2"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className='fs-3 fw-bold' style={{color: '#37517E'}}>Optimize Efficiency</h5>
                        <p>Streamline your operations and optimize efficiency with our solutions.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default CarouselComponent;
