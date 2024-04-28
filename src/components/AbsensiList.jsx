import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../features/dataFormatter';

const AbsensiList = () => {
    const [absensiList, setAbsensiList] = useState([]);

    useEffect(() => {
        callProduct();
    }, []);

    const callProduct = async () => {
        const response = await axios.get('http://localhost:5000/absensi');
        setAbsensiList(response.data);
    };

    return (
        <>
            <h1 className="title">Absensi</h1>
            <h2 className="subtitle">List of Absensi</h2>
            <table className="table is-hoverable is-fullwidth">
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
                            <td>{absen.user.name}</td>
                            <td>{formatDate(absen.tanggal)}</td>
                            <td>{formatTime(absen.jam_masuk)}</td>
                            <td>{formatTime(absen.jam_keluar)}</td>
                            <td>{absen.jml_siswa}</td>
                            <td>{absen.jml_soal}</td>
                            <td>{absen.jml_ketik}</td>
                            <td>{absen.jml_paket}</td>
                            <td>{absen.jml_quiziz}</td>
                            <td>{absen.lain_lain}</td>
                            <td>
                                <Link
                                    to={`/absensi/edit/${absen.uuid}`}
                                    className="button"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AbsensiList;
