import React from 'react';
import { Link } from 'react-router-dom';
const ListRekap = () => {
    const months = [
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

    const years = [2024, 2025, 2026];

    return (
        <div className="col-12 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4>Daftar Presensi</h4>
                </div>
                <div className="card-body">
                    <div className="accordion" id="accordionExample">
                        {years.map((year) => (
                            <div className="accordion-item">
                                <h2
                                    className="accordion-header"
                                    id={`id${year}`}
                                >
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${year}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${year}`}
                                    >
                                        {year}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${year}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`id${year}`}
                                    data-bs-parent="#accordionExample"
                                    style={{}}
                                >
                                    <div className="accordion-body">
                                        <div className="list-group">
                                            {months.map((month, index) => (
                                                <Link
                                                    to={
                                                        '/rekapitulasi/details?year=' +
                                                        year +
                                                        '&month=' +
                                                        (index + 1)
                                                    }
                                                    className="list-group-item list-group-item-action "
                                                >
                                                    {month}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* <div className="accordion-item">
                            <h2 className="accordion-header" id="conothaja">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ipangcobaaccordion"
                                    aria-expanded="false"
                                    aria-controls="ipangcobaaccordion"
                                >
                                    Accordion Item #2
                                </button>
                            </h2>
                            <div
                                id="ipangcobaaccordion"
                                className="accordion-collapse collapse"
                                aria-labelledby="conothaja"
                                data-bs-parent="#accordionExample"
                                style={{}}
                            >
                                <div className="accordion-body">
                                    <strong>
                                        This is the second item's accordion
                                        body.
                                    </strong>{' '}
                                    It is hidden by default, until the collapse
                                    plugin adds the appropriate classes that we
                                    use to style each element. These classes
                                    control the overall appearance, as well as
                                    the showing and hiding via CSS transitions.
                                    You can modify any of this with custom CSS
                                    or overriding our default variables. It's
                                    also worth noting that just about any HTML
                                    can go within the{' '}
                                    <code>.accordion-body</code>, though the
                                    transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    Accordion Item #3
                                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                                style={{}}
                            >
                                <div className="accordion-body">
                                    <strong>
                                        This is the third item's accordion body.
                                    </strong>{' '}
                                    It is hidden by default, until the collapse
                                    plugin adds the appropriate classes that we
                                    use to style each element. These classes
                                    control the overall appearance, as well as
                                    the showing and hiding via CSS transitions.
                                    You can modify any of this with custom CSS
                                    or overriding our default variables. It's
                                    also worth noting that just about any HTML
                                    can go within the{' '}
                                    <code>.accordion-body</code>, though the
                                    transition does limit overflow.
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListRekap;
