import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../features/dataFormatter';

const AbsensiList = () => {
    const [absensiList, setAbsensiList] = useState([]);
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 10;

    useEffect(() => {
        callProduct(currentPage);
    }, [currentPage, absensiList]);

    const callProduct = async (page) => {
        const response = await axios.get(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi?page=${page}&limit=${limit}`
        );
        const { data, pagination } = response.data;
        setAbsensiList(data);
        setNext(pagination.next);
        setPrev(pagination.prev);
        setTotalPage(pagination.totalPage);
    };

    const deleteAbsensi = async (uuid) => {
        try {
            await axios.delete(
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/${uuid}`
            );
            callProduct(currentPage);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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

    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();

    return (
        <div className="col-12 col-md-12">
            <div className="row">
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Bulan: </p>

                            <h5> {month[thisMonth - 1]} </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Tahun: </p>
                            <p>
                                <h5> {thisYear} </h5>
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
                                <h1>List Presensi</h1>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-lg table-hover text-center">
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
                                            <td>
                                                {currentPage > 1
                                                    ? limit *
                                                          (currentPage - 1) +
                                                      index +
                                                      1
                                                    : index + 1}
                                            </td>
                                            <td>
                                                {absen.user
                                                    ? absen.user.name
                                                    : 'user deleted'}
                                            </td>
                                            <td>{formatDate(absen.tanggal)}</td>
                                            <td>
                                                {formatTime(absen.jam_masuk)}
                                            </td>
                                            <td>
                                                {formatTime(absen.jam_keluar)}
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

                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-primary  justify-content-center">
                                <li className="page-item ">
                                    <button
                                        className="page-link"
                                        onClick={handlePrev}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {/* prev page */}

                                {prev ? (
                                    <li className="page-item ">
                                        <button
                                            className="page-link"
                                            onClick={handlePrev}
                                        >
                                            {prev}
                                        </button>
                                    </li>
                                ) : null}

                                {/* current page */}
                                <li className="page-item active">
                                    <button
                                        className="page-link"
                                        onClick={handlePrev}
                                    >
                                        {currentPage}
                                    </button>
                                </li>

                                {/* next page */}
                                {next ? (
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={handleNext}
                                        >
                                            {next}
                                        </button>
                                    </li>
                                ) : null}

                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbsensiList;
