import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';
import { getMe } from '../features/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    return (
        // <section className="hero is-fullheight is-fullwidth">
        //     <div className="hero-body">
        //         <div className="container">
        //             <div className="columns is-centered">
        //                 <div className="column is-4">
        //                     <form onSubmit={Auth} className="box">
        //                         {isError && (
        //                             <p className="has-text-centered">
        //                                 {message}
        //                             </p>
        //                         )}
        //                         <h1 className="title is-2">Sign In</h1>
        //                         <div className="field">
        //                             <label className="label">Email</label>
        //                             <div className="control">
        //                                 <input
        //                                     type="text"
        //                                     className="input"
        //                                     value={email}
        //                                     onChange={(e) =>
        //                                         setEmail(e.target.value)
        //                                     }
        //                                     placeholder="Email"
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className="field">
        //                             <label className="label">Password</label>
        //                             <div className="control">
        //                                 <input
        //                                     type="password"
        //                                     className="input"
        //                                     value={password}
        //                                     onChange={(e) =>
        //                                         setPassword(e.target.value)
        //                                     }
        //                                     placeholder="******"
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className="field mt-5">
        //                             <button
        //                                 type="submit"
        //                                 className="button is-success is-fullwidth"
        //                             >
        //                                 {isLoading ? 'Loading...' : 'Login'}
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={Auth}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">
                                    Sign in
                                </p>
                                <button
                                    type="button"
                                    data-mdb-button-init=""
                                    data-mdb-ripple-init=""
                                    className="btn btn-primary btn-floating mx-1"
                                >
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button
                                    type="button"
                                    data-mdb-button-init=""
                                    data-mdb-ripple-init=""
                                    className="btn btn-primary btn-floating mx-1"
                                >
                                    <i className="fab fa-twitter" />
                                </button>
                                <button
                                    type="button"
                                    data-mdb-button-init=""
                                    data-mdb-ripple-init=""
                                    className="btn btn-primary btn-floating mx-1"
                                >
                                    <i className="fab fa-linkedin-in" />
                                </button>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">
                                    BM Homeschooling
                                </p>
                            </div>
                            <div>
                                {isError && (
                                    <p className="text-centered">{message}</p>
                                )}
                            </div>
                            {/* Email input */}
                            <div
                                data-mdb-input-init=""
                                className="form-outline mb-4"
                            >
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter valid email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Password input */}
                            <div
                                data-mdb-input-init=""
                                className="form-outline mb-3"
                            >
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        defaultValue=""
                                        id="form2Example3"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="form2Example3"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    data-mdb-button-init=""
                                    data-mdb-ripple-init=""
                                    className="btn btn-primary btn-lg"
                                    style={{
                                        paddingLeft: '2.5rem',
                                        paddingRight: '2.5rem',
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                {/* Copyright */}
                <div className="text-white mb-3 mb-md-0">
                    Yayasan Nur Iman Syariah @ 2024
                </div>
                {/* Copyright */}
                {/* Right */}
                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter" />
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-google" />
                    </a>
                    <a href="#!" className="text-white">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                {/* Right */}
            </div>
        </section>
    );
};

export default Login;
