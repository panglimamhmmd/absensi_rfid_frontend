import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatDate, formatTime } from '../features/dataFormatter';

const MonthlyList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryYear = queryParams.get('year') || new Date().getFullYear();
    const queryMonth = queryParams.get('month') || new Date().getMonth() + 1;

    const [absensiList, setAbsensiList] = useState([]);
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 10;

    // Month and year selection
    const [selectMonth, setSelectMonth] = useState(queryMonth);
    const [selectYear, setSelectYear] = useState(queryYear);

    useEffect(() => {
        getAbsensi(currentPage, selectMonth, selectYear);
    }, [currentPage, selectMonth, selectYear]);

    const getAbsensi = async (page, month, year) => {
        try {
            const response = await axios.get(
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi?year=${year}&month=${month}&page=${page}&limit=${limit}`
            );
            const { data, pagination } = response.data;
            setAbsensiList(data || []);
            setNext(pagination?.next || 0);
            setPrev(pagination?.prev || 0);
            setTotalPage(pagination?.totalPage || 0);
        } catch (error) {
            console.error(error.message);
            setAbsensiList([]);
            setNext(0);
            setPrev(0);
            setTotalPage(0);
        }
    };

    const deleteAbsensi = async (uuid) => {
        try {
            await axios.delete(
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/${uuid}`
            );
            getAbsensi(currentPage, selectMonth, selectYear);
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

    return (
        <div className="col-12 col-md-12">
            <div className="row">
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Bulan: </p>
                            <h5> {month[Number(selectMonth) - 1]} </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <p>Tahun: </p>
                            <h5> {selectYear} </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div className=" d-flex justify-content-between mx-auto mt-1    ">
                            <div>
                                <Link to={`/rekapitulasi`} className="mb-2">
                                    <i className="bi bi-arrow-left"></i> Back
                                </Link>
                            </div>
                            <div className="selectMonth d-flex align-items-center">
                                {/* year */}
                                <fieldset className="form-group">
                                    <select
                                        className="form-select"
                                        id="basicSelect"
                                        value={selectYear}
                                        onChange={(e) => {
                                            setSelectYear(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Year</option>
                                        {[...Array(10)].map((_, i) => {
                                            const year =
                                                new Date().getFullYear() - i;
                                            return (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </fieldset>
                                {/* month */}
                                <fieldset className="form-group">
                                    <select
                                        className="form-select"
                                        id="basicSelect"
                                        value={selectMonth}
                                        onChange={(e) => {
                                            setSelectMonth(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Select Month</option>
                                        {month.map((item, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                            </div>
                        </div>
                        {absensiList.length > 0 ? (
                            <>
                                <div className="table-responsive">
                                    <table className="table table-lg table-hover">
                                        <thead className="">
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
                                                                  (currentPage -
                                                                      1) +
                                                              index +
                                                              1
                                                            : index + 1}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/rekapitulasi/details/users?year=${queryYear}&month=${queryMonth}&userId=${absen.userId}`}
                                                        >
                                                            {absen.user
                                                                ? absen.user
                                                                      .name
                                                                : 'user deleted'}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {formatDate(
                                                            absen.tanggal
                                                        )}
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
                                                        {absen.lain_lain
                                                            .length > 10
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
                                                                if (
                                                                    confirmDelete
                                                                ) {
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
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={handlePrev}
                                                disabled={prev === 0}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {prev ? (
                                            <li className="page-item">
                                                <button
                                                    className="page-link"
                                                    onClick={handlePrev}
                                                >
                                                    {prev}
                                                </button>
                                            </li>
                                        ) : null}
                                        <li className="page-item active">
                                            <button className="page-link">
                                                {currentPage}
                                            </button>
                                        </li>
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
                                                disabled={next === 0}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </>
                        ) : (
                            <div className="text-center">
                                <h1>Belum Ada Absensi</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {absensiList.length > 0 ? (
                <div className="card">
                    <div className="card-body">
                        <h3>Rekapitulasi Absensi</h3>
                        <h5>
                            Bulan: {month[selectMonth - 1]} | Tahun {selectYear}
                        </h5>
                        <div className="table-responsive">
                            <table className="table table-lg table-hover">
                                <thead className="">
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Jam Mengajar</th>
                                        <th>Banyak Siswa</th>
                                        <th>Nomor Soal Kunci</th>
                                        <th>Halaman Pengetikan</th>
                                        <th>Paket Soal</th>
                                        <th>Paket Quiziz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Link to={'#'}>Ipang</Link>
                                        </td>
                                        <td>12 Jam</td>
                                        <td>12 Siswa</td>
                                        <td>100 Nomor</td>
                                        <td>100 Halaman</td>
                                        <td>10 Paket</td>
                                        <td>10 Paket</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MonthlyList;
