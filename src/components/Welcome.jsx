import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Welcome = () => {
    const [dashboard, setDashboard] = useState([]);
    const [todayAbsensi, setTodayAbsensi] = useState([]);
    const dashboardData = async () => {
        const response = await axios.get(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/dashboard`
        );
        setDashboard(response.data);
    };

    const getAbsensi = async () => {
        const response = await axios.get(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/today`
        );
        setTodayAbsensi(response.data);
    };

    useEffect(() => {
        dashboardData();
        getAbsensi();
    }, []);

    // chart
    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        },
    });

    const [series, setSeries] = useState([
        {
            name: 'series-1',
            data: [8, 10, 9, 16, 10, 12, 8, 12, 8, 10, 9, 11],
        },
    ]);

    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <div className="page-content">
                {user && user.role === 'admin' && (
                    <section className="row">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-6 col-lg-3 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                                    <div className="stats-icon purple mb-2">
                                                        <i className="iconly-boldShow" />
                                                        <i className="iconly-Curved-User" />
                                                    </div>
                                                </div>
                                                {/* pengajar aktif dan non aktif masih belum dibuat */}
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">
                                                        Pengajar Aktif
                                                    </h6>
                                                    <h6 className="font-extrabold mb-0">
                                                        {dashboard.totalUser}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                                    <div className="stats-icon blue mb-2">
                                                        <i className="iconly-boldProfile" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">
                                                        Pengajar Non Aktif
                                                    </h6>
                                                    <h6 className="font-extrabold mb-0">
                                                        2
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                                    <div className="stats-icon green mb-2">
                                                        <i className="iconly-boldAdd-User" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">
                                                        Presensi Hari ini
                                                    </h6>
                                                    <h6 className="font-extrabold mb-0">
                                                        {
                                                            dashboard.totalTodayAbsensi
                                                        }
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                                    <div className="stats-icon red mb-2">
                                                        <i className="iconly-boldBookmark" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">
                                                        Presensi Bulan ini
                                                    </h6>
                                                    <h6 className="font-extrabold mb-0">
                                                        {
                                                            dashboard.totalAbsensiBulanIni
                                                        }
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-xl-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Jumlah Pengajar</h4>
                                        </div>
                                        <div className="card-body">
                                            <Chart
                                                options={options}
                                                series={series}
                                                type="area"
                                                height={320}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-xl-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4>Absensi Hari Ini </h4>
                                            <div className="table-responsive">
                                                <table className="table table-hover table-lg text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Nama Pengajar
                                                            </th>
                                                            <th>Jam Masuk</th>
                                                            <th>Jam Keluar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {todayAbsensi.map(
                                                            (absen) => (
                                                                <tr>
                                                                    <td className="col-3">
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="font-bold mb-0">
                                                                                {
                                                                                    absen
                                                                                        .user
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="col-auto">
                                                                        <p className="mb-0">
                                                                            {
                                                                                absen.jam_masuk
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td className="col-auto">
                                                                        <p className="mb-0">
                                                                            {
                                                                                absen.jam_keluar
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            {user && user.role === 'user' && (
                <>
                    <h1>Selamat datang {user.name}</h1>
                    <p>
                        Last login : <strong>18.20 </strong> 19 Juni 2024{' '}
                    </p>
                </>
            )}
        </div>
    );
};

export default Welcome;
