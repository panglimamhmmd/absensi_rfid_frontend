import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer clearfix mb-0 text-muted">
            <div className="float-start">
                <p>BM Presensi Application </p>
            </div>
            <div className="float-end">
                <p>
                    <span className="text-danger">
                        <i className="bi bi-heart-fill icon-mid"></i>
                    </span>
                    2024
                </p>
            </div>
        </div>
    );
};

export default Footer;
