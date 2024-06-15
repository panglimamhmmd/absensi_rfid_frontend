import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="footer clearfix mb-0 text-muted">
                <div className="float-start">
                    <p>2023 &copy; Mazer</p>
                </div>
                <div className="float-end">
                    <p>
                        Crafted with
                        <span className="text-danger">
                            <i className="bi bi-heart-fill icon-mid"></i>
                        </span>
                        by <Link to="https://saugi.me">Saugi</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
