import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditAbsensi = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [jamMasuk, setJamMasuk] = useState('');
    const [jamKeluar, setJamKeluar] = useState('');
    const [jmlSiswa, setJmlSiswa] = useState(0);
    const [jmlSoal, setJmlSoal] = useState(0);
    const [jmlKetik, setJmlKetik] = useState(0);
    const [jmlPaket, setJmlPaket] = useState(0);
    const [jmlQuiziz, setJmlQuiziz] = useState(0);
    const [lainLain, setLainLain] = useState('');
    const [msg, setMsg] = useState('');
    // cari produk

    useEffect(() => {
        const searchAbsensi = async () => {
            try {
                const response = await axios.get(
                    `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/${id}`
                );
                setJamKeluar(response.data.jam_keluar);
                setJamMasuk(response.data.jam_masuk);
                setJmlSiswa(response.data.jml_siswa);
                setJmlKetik(response.data.jml_ketik);
                setJmlPaket(response.data.jml_paket);
                setJmlQuiziz(response.data.jml_quiziz);
                setTanggal(response.data.tanggal);
                setLainLain(response.data.lain_lain);
                setJmlSoal(response.data.jml_soal);
            } catch (error) {
                setMsg('data tidak ditemukan!');
            }
        };
        searchAbsensi();
    }, [id]);

    const updateAbsensi = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/absensi/${id}`,
                {
                    jml_siswa: jmlSiswa,
                    jml_soal: jmlSoal,
                    jml_ketik: jmlKetik,
                    jml_paket: jmlPaket,
                    jml_quiziz: jmlQuiziz,
                    lain_lain: lainLain,
                }
            );
            navigate('/absensi');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const resetForm = () => {
        setJmlSiswa(0);
        setJmlSoal(0);
        setJmlKetik(0);
        setJmlPaket(0);
        setJmlQuiziz(0);
        setLainLain('');
    };
    const monthNames = [
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

    // make a function to format date from dd mm yyyy to dd month yyyy
    const formatDate = (dateString) => {
        // Split the date string by '-'
        const [year, month, day] = dateString.split('-');
        // Return the formatted date string
        return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div className="col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Kegiatan Absensi</h3>
                    <h4 className="card-title">{formatDate(tanggal)}</h4>
                    <p className="text-danger">{msg}</p>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <form
                            className="form form-horizontal"
                            onSubmit={updateAbsensi}
                        >
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="jam-masuk">
                                            Jam Masuk
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="time"
                                            readOnly
                                            className="form-control"
                                            id="jam-masuk"
                                            value={jamMasuk}
                                            onChange={(e) =>
                                                setJamMasuk(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jam-keluar">
                                            Jam Keluar
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="time"
                                            readOnly
                                            className="form-control"
                                            id="jam-keluar"
                                            value={jamKeluar}
                                            onChange={(e) =>
                                                setJamKeluar(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jml-siswa">
                                            Jumlah Siswa
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="jml-siswa"
                                            value={jmlSiswa}
                                            onChange={(e) =>
                                                setJmlSiswa(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jml-soal">
                                            Jumlah Soal
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="jml-soal"
                                            value={jmlSoal}
                                            onChange={(e) =>
                                                setJmlSoal(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jml-ketik">
                                            Jumlah Ketik
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="jml-ketik"
                                            value={jmlKetik}
                                            onChange={(e) =>
                                                setJmlKetik(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jml-paket">
                                            Jumlah Paket
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="jml-paket"
                                            value={jmlPaket}
                                            onChange={(e) =>
                                                setJmlPaket(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="jml-quiziz">
                                            Jumlah Quiziz
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="jml-quiziz"
                                            value={jmlQuiziz}
                                            onChange={(e) =>
                                                setJmlQuiziz(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="lain-lain">
                                            Lain-Lain
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <textarea
                                            class="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            style={{ height: '130px' }}
                                            value={lainLain}
                                            onChange={(e) =>
                                                setLainLain(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="col-sm-12 d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-1 mb-1"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={resetForm}
                                            className="btn btn-light-secondary me-1 mb-1"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditAbsensi;
