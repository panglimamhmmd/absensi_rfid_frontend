import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MazerSidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    // month in indonesia
    const month = new Date().toLocaleString('default', { month: 'long' });

    return (
        <div id="sidebar">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header position-relative">
                    <div className="d-flex justify-content-between align-items-center"></div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title ">
                            <span className="text-secondary">Menu</span>{' '}
                        </li>
                        <li
                            className={`sidebar-item ${
                                location.pathname === '/dashboard'
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <NavLink to="/dashboard" className="sidebar-link">
                                <i className="bi bi-grid-fill" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        {user && user.role === 'admin' && (
                            <div className="user-management">
                                <li className="sidebar-title">
                                    <span className="text-secondary">
                                        User Management
                                    </span>
                                </li>
                                <li
                                    className={`sidebar-item ${
                                        location.pathname === '/users'
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    <NavLink
                                        to={'/users'}
                                        className="sidebar-link"
                                    >
                                        <i className="bi bi-people-fill"></i>
                                        <span>Daftar Pengajar</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={`sidebar-item ${
                                        location.pathname === '/users/add'
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    <NavLink
                                        to={'/users/add'}
                                        className="sidebar-link active"
                                    >
                                        <i className="bi bi-person-fill-add"></i>
                                        <span>Tambah Pengajar</span>
                                    </NavLink>
                                </li>
                            </div>
                        )}
                        <li className="sidebar-title">
                            <span className="text-secondary">
                                Presensi Management
                            </span>
                        </li>

                        <li
                            className={`sidebar-item ${
                                location.pathname === '/rekapitulasi'
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <NavLink
                                to={'/rekapitulasi'}
                                className="sidebar-link"
                            >
                                <i className="bi bi-calendar-fill"></i>
                                <span>Daftar Presensi</span>
                            </NavLink>
                        </li>

                        <li
                            className={`sidebar-item ${
                                location.pathname === '/absensi' ? 'active' : ''
                            }`}
                        >
                            <NavLink to={'/absensi'} className="sidebar-link">
                                <i className="bi bi-tag-fill"></i>
                                <span>Presensi: {month}</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MazerSidebar;
