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
                    `http://localhost:5000/absensi/${id}`
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
            await axios.patch(`http://localhost:5000/absensi/${id}`, {
                jml_siswa: jmlSiswa,
                jml_soal: jmlSoal,
                jml_ketik: jmlKetik,
                jml_paket: jmlPaket,
                jml_quiziz: jmlQuiziz,
                lain_lain: lainLain,
            });
            navigate('/absensi');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    return (
        <div>
            <h1 className="title">Absensi</h1>
            <h2 className="subtitle">Edit Absensi</h2>
            <h2 className="subtitle">{tanggal}</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateAbsensi}>
                            <p className="has-text-centered">{msg}</p>

                            <div className="field">
                                <label className="label">Jam Masuk</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jamMasuk}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Jam Keluar</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jamKeluar}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Jumlah Siswa</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jmlSiswa}
                                        onChange={(e) =>
                                            setJmlSiswa(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Jumlah Soal</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jmlSoal}
                                        onChange={(e) =>
                                            setJmlSoal(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Jumlah Ketik</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jmlKetik}
                                        onChange={(e) =>
                                            setJmlKetik(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">
                                    Jumlah Paket Soal
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jmlPaket}
                                        onChange={(e) =>
                                            setJmlPaket(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">
                                    Jumlah Paket Quiziz
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jmlQuiziz}
                                        onChange={(e) =>
                                            setJmlQuiziz(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Lain-Lain</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={lainLain}
                                        onChange={(e) =>
                                            setLainLain(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="field" id="submitbutton">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button is-success"
                                    >
                                        Update
                                    </button>
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
