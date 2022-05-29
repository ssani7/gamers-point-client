import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer class="text-center text-lg-start footer-bg text-muted mt-5">
            <section class="pt-3 text-white">
                <div class="container text-center text-md-start mt-5">
                    <div class="row mt-3">
                        <div class="col-4 col-md-3 col-lg-4 mx-auto mb-4 text-center">
                            <h6 class="text-uppercase fw-bold mb-4">
                                Gamers Point
                            </h6>
                            <p>
                                This website is a prototype and is used for educational purposes and skill showcase.
                            </p>
                        </div>

                        <div class="col-4 col-md-2 col-lg-2 mx-auto mb-4 text-center">
                            {/* <!-- Links --> */}
                            <h6 class="text-uppercase fw-bold mb-4">
                                Skills
                            </h6>
                            <p>
                                <a href="#!" class="text-reset">Javascript</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">React</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Node.js</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">MongoDB</a>
                            </p>
                        </div>

                        <div class="col-4 col-md-3 col-lg-2 mx-auto mb-4 text-center">
                            <h6 class="text-uppercase fw-bold mb-4">
                                CSS Skills
                            </h6>
                            <p>
                                <a href="#!" class="text-reset">Vanila CSS</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Tailwind</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Bootstrap</a>
                            </p>
                        </div>

                        <div class="col-12 col-md-4 col-lg-3 mx-auto mb-md-0 mb-4 text-center">
                            <h6 class="text-uppercase fw-bold mb-4">
                                Contact
                            </h6>
                            <div>
                                <a href="https://www.facebook.com/im5ani/" target="_blank" rel="noreferrer" class="me-4 text-reset">
                                    <FontAwesomeIcon icon={faFacebook} className='icons' />
                                </a>
                                <a href="https://twitter.com/sanaullahsani07" target="_blank" rel="noreferrer" class="me-4 text-reset">
                                    <FontAwesomeIcon icon={faTwitter} className='icons' />
                                </a>
                            </div>
                            <p className='mt-3'>
                                sanaullah.sani756@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Copyright --> */}
            <div class="text-center text-white p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © {new Date().getFullYear()} Copyright:
                <span class="text-reset fw-bold"> Sanaullah Sani</span>
            </div>
        </footer>
    );
};

export default Footer;