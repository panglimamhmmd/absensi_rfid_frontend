import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { LogOut, reset } from '../features/authSlice';
import NewSidebar from '../components/NewSidebar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const MazerLayout = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate('/');
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    function getFormattedTime() {
        const now = new Date();

        const year = now.getFullYear();
        const date = String(now.getDate()).padStart(2, '0');
        const month = now.toLocaleString('default', { month: 'long' });

        return `${year}, ${date} ${month}`;
    }

    return (
        <React.Fragment>
            <div id="app">
                <NewSidebar />
                <div id="main">
                    <div>
                        <header className="mb-3">
                            <Link
                                to="#"
                                className="burger-btn d-block d-xl-none"
                            >
                                <i className="bi bi-justify fs-3"></i>
                            </Link>
                        </header>
                        <div className="d-flex justify-content-between mx-auto">
                            <div className="">
                                <div className="page-heading">
                                    <h3>BM Presensi Application</h3>
                                    <p>{getFormattedTime()}</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="d-flex align-items-center">
                                    <div className="avatar avatar-xl">
                                        <img src="/image/5.jpg" alt="Face 1" />
                                    </div>
                                    <div className="ms-3 name">
                                        <div className="dropdown">
                                            <p
                                                className=" dropdown-toggle me-1"
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <strong>
                                                    {user && user.name}
                                                </strong>
                                            </p>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton"
                                                style={{}}
                                            >
                                                <button
                                                    className="dropdown-item"
                                                    to="#"
                                                    onClick={logout}
                                                >
                                                    Log Out
                                                </button>
                                            </div>
                                        </div>

                                        <h6 className="text-muted mb-0">
                                            <strong>
                                                {user && user.email}
                                            </strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {children}
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default MazerLayout;
