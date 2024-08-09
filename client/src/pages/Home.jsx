import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import 'animate.css';
import p_1 from '../assets/dashboard-img/Designer_7.jpeg';
import p_2 from '../assets/dashboard-img/Designer_8.jpeg';
import p_3 from '../assets/dashboard-img/Designer_6.jpeg';
import p_4 from '../assets/dashboard-img/Designer_4.jpeg';

export const Home = () => {

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = () => {
        const next = (activeSlide + 1) % 3;
        setActiveSlide(next);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 4000);

        return () => clearInterval(intervalId);
    }, [activeSlide]);

    return (
        <div className='text-white'>
            <div id="carouselExampleIndicators" className="carousel slide">
                <ol className="carousel-indicators">
                    <li
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className={activeSlide === 0 ? 'active' : ''}
                        onClick={() => setActiveSlide(0)}
                    ></li>
                    <li
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        className={activeSlide === 1 ? 'active' : ''}
                        onClick={() => setActiveSlide(1)}
                    ></li>
                    <li
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        className={activeSlide === 2 ? 'active' : ''}
                        onClick={() => setActiveSlide(2)}
                    ></li>
                </ol>
                <div className="carousel-inner">
                    <div className={`carousel-item ${activeSlide === 0 ? 'active' : ''} c-item animated fadeIn`}>
                        <img src={p_1} className="d-block w-100 c-img" alt="..." />
                        <div className="carousel-caption">
                            <div className="container rounded-3 display-6 p-2" style={{ textShadow: "1px 1px #11303F", backgroundColor: "white", opacity: "75%", color: "#11303F" }}>
                                <p className="animate__animated animate__lightSpeedInRight text-uppercase" style={{ fontWeight: "bold" }}> BudgetBuddy </p>
                                <p className="animate__animated animate__lightSpeedInLeft">Take Control of Your Finances</p>
                            </div>
                        </div>
                    </div>
                    <div className={`carousel-item ${activeSlide === 1 ? 'active' : ''} c-item animated fadeIn`}>
                        <img src={p_2} className="d-block w-100 c-img" alt="..." />
                        <div className="carousel-caption">
                            <div className="container rounded-3 display-6 p-2" style={{ textShadow: "1px 1px #11303F", backgroundColor: "white", opacity: "75%", color: "#11303F" }}>
                                <p className="animate__animated animate__lightSpeedInRight text-uppercase" style={{ fontWeight: "bold" }}> BudgetBuddy </p>
                                <p className="animate__animated animate__lightSpeedInLeft">Effortless Expense Management</p>
                            </div>
                        </div>
                    </div>
                    <div className={`carousel-item ${activeSlide === 2 ? 'active' : ''} c-item animated fadeIn`}>
                        <img src={p_3} className="d-block w-100 c-img" alt="..." />
                        <div className="carousel-caption">
                            <div className="container rounded-3 display-6 p-2" style={{ textShadow: "1px 1px #11303F", backgroundColor: "white", opacity: "75%", color: "#11303F" }}>
                                <p className="animate__animated animate__lightSpeedInRight text-uppercase" style={{ fontWeight: "bold" }}> BudgetBuddy </p>
                                <p className="animate__animated animate__lightSpeedInLeft">Streamline Your Financial Life</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="company-details container-fluid">
                <div className="row p-5 bg-dark d-flex align-items-center">
                    <div className="col d-flex justify-content-center">
                        <div className="py-5">
                            <img src={p_4} className="rounded rounded-3" alt="..." style={{ height: "50vh", width: "auto" }} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="container-fluid p-5" style={{ marginLeft: "-40px" }}>
                            <p className='display-5' style={{ fontWeight: "400" }}>Simplifying Expense Tracking for Modern Businesses</p>
                            <p className='display-6' style={{ fontSize: "3vh" }}>Welcome to BudgetBuddy, your trusted partner in managing and tracking business expenses. Our innovative platform provides businesses of all sizes with the tools needed to efficiently monitor and control expenditures.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
