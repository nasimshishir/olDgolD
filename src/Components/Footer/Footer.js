import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <div className=''>
                        <img className='max-w-20' src={logo} alt="" />
                    </div>
                    <div className=''>
                        <span className="footer-title">Categories</span>
                        <Link to="/categories/Multi Rotor Drones" className="link link-hover"><p></p>Multi Rotor Drones</Link>
                        <Link to="/categories/Fixed-Wing Drones" className="link link-hover"><p></p>Fixed-Wing Drones</Link>
                        <Link to="/categories/Single-Rotor Drones" className="link link-hover"><p></p>Single-Rotor Drones</Link>
                    </div>


                    <div className=''>
                        <span className="footer-title">Newsletter</span>
                        <div className="form-control w-80">
                            <label className="label">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="relative">
                                <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                            </div>
                        </div>
                    </div>

                </div>

            </footer>
        </div>
    );
};

export default Footer;