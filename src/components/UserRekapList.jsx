import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate, formatTime } from '../features/dataFormatter';

const UserRekapList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryYear = queryParams.get('year');
    const queryMonth = queryParams.get('month');
    const userId = queryParams.get('userId');
    const [absensiList, setAbsensiList] = useState([]);

    useEffect(() => {
        callProduct();
    }, []);

    const callProduct = async () => {
        const response = await axios.get(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi?year=${queryYear}&month=${queryMonth}&userId=${userId}&limit=40`
        );
        setAbsensiList(response.data.data);
    };

    const deleteAbsensi = async (uuid) => {
        try {
            await axios.delete(
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/${uuid}`
            );
            callProduct();
        } catch (error) {
            console.log(error.message);
        }
    };

    const month = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    return (
        <div className="col-12 col-md-12">
            <div className="row">
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Bulan: </p>
                            <p>
                                <h5> {month[Number(queryMonth) - 1]} </h5>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Tahun: </p>
                            <p>
                                <h5> {queryYear} </h5>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Pengajar: </p>
                            <p>
                                <h5> {absensiList[0]?.user?.name} </h5>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div className=" d-flex justify-content-between mx-auto">
                            <div>
                                <h1>List Presensi </h1>
                            </div>
                        </div>
                        {absensiList.length === 0 ? (
                            <p className="text-center">Tidak ada data</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-lg table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Tanggal</th>
                                            <th>Jam Masuk</th>
                                            <th>Jam Keluar</th>
                                            <th>Banyak Siswa</th>
                                            <th>Nomor Soal Kunci</th>
                                            <th>Halaman Pengetikan</th>
                                            <th>Paket Soal</th>
                                            <th>Paket Quiziz</th>
                                            <th>Lain-lain</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {absensiList.map((absen, index) => (
                                            <tr key={absen.uuid}>
                                                <th> {index + 1} </th>
                                                <td>
                                                    {absen.user
                                                        ? absen.user.name
                                                        : 'user deleted'}
                                                </td>
                                                <td>
                                                    {formatDate(absen.tanggal)}
                                                </td>
                                                <td>
                                                    {formatTime(
                                                        absen.jam_masuk
                                                    )}
                                                </td>
                                                <td>
                                                    {formatTime(
                                                        absen.jam_keluar
                                                    )}
                                                </td>
                                                <td>{absen.jml_siswa}</td>
                                                <td>{absen.jml_soal}</td>
                                                <td>{absen.jml_ketik}</td>
                                                <td>{absen.jml_paket}</td>
                                                <td>{absen.jml_quiziz}</td>
                                                <td>
                                                    {absen.lain_lain.length > 10
                                                        ? `${absen.lain_lain.substring(
                                                              0,
                                                              10
                                                          )}...`
                                                        : absen.lain_lain}
                                                </td>

                                                <td>
                                                    <Link
                                                        to={`/absensi/edit/${absen.uuid}`}
                                                        className="btn btn-primary"
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            const confirmDelete =
                                                                window.confirm(
                                                                    `Apakah Anda yakin ingin menghapus data absensi ${
                                                                        absen.user
                                                                            ? absen
                                                                                  .user
                                                                                  .name
                                                                            : 'user deleted'
                                                                    }?`
                                                                );
                                                            if (confirmDelete) {
                                                                deleteAbsensi(
                                                                    `${absen.uuid}`
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRekapList;
