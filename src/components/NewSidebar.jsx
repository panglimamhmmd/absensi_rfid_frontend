import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MazerSidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
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
                                        <span>Manage Users</span>
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
                                        <span>Add User</span>
                                    </NavLink>
                                </li>
                            </div>
                        )}
                        <li className="sidebar-title">
                            <span className="text-secondary">
                                Attendance Management
                            </span>
                        </li>

                        <li
                            className={`sidebar-item ${
                                location.pathname === '/absensi' ? 'active' : ''
                            }`}
                        >
                            <NavLink to={'/absensi'} className="sidebar-link">
                                <i className="bi bi-tag-fill"></i>
                                <span>Manage Attendance</span>
                            </NavLink>
                        </li>
                        {/* <li
                            className={`sidebar-item ${
                                location.pathname === '/products/add'
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <NavLink
                                to={'/products/add'}
                                className="sidebar-link"
                            >
                                <i className="bi bi-bag-plus-fill"></i>
                                <span>Add Product</span>
                            </NavLink>
                        </li> */}
                        {/* <li className="sidebar-title">
                            <span className="text-secondary">Categories</span>
                        </li>
                        <li
                            className={`sidebar-item ${
                                location.pathname === '/category'
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <Link to="/category" className="sidebar-link">
                                <i className="bi bi-grid-fill" />
                                <span>Categories</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MazerSidebar;
