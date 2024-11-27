import React, { useState, useEffect } from 'react';
import './Agenda.css';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Agenda = () => {
    const [agendaList, setAgendaList] = useState([]);
    const [formData, setFormData] = useState({
        tanggal: '',
        waktu: '',
        tempat: '',
        agenda: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate

    // Fetch agenda from localStorage on component mount
    useEffect(() => {
        const storedAgenda = JSON.parse(localStorage.getItem('agendaList')) || [];
        setAgendaList(storedAgenda);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAgenda = { ...formData, id: Date.now() }; // Unique ID based on timestamp

        setAgendaList((prev) => {
            const updatedAgendaList = [...prev, newAgenda];
            localStorage.setItem('agendaList', JSON.stringify(updatedAgendaList));
            return updatedAgendaList;
        });

        Swal.fire({
            title: 'Agenda Tersimpan!',
            html: `Tanggal Kegiatan: ${formData.tanggal}<br>Waktu Kegiatan: ${formData.waktu}<br>Tempat Kegiatan: ${formData.tempat}<br>Agenda Kegiatan: ${formData.agenda}`,
            icon: 'success',
            confirmButtonText: 'Tutup'
        });

        setFormData({ tanggal: '', waktu: '', tempat: '', agenda: '' });
        setIsModalOpen(false); // Close modal after submitting
    };

    const handleDelete = (id) => {
        const updatedAgendaList = agendaList.filter((item) => item.id !== id);
        setAgendaList(updatedAgendaList);

        localStorage.setItem('agendaList', JSON.stringify(updatedAgendaList));

        Swal.fire("Agenda Dihapus!", "Agenda telah berhasil dihapus.", "success");
    };

    return (
        <div className="agenda-container">
            <h2>Agenda Dinas Luar Pimpinan<br />Satuan Pendidikan</h2>
            <button onClick={() => setIsModalOpen(true)} className="open-modal-button">
                <FaPlusCircle /> Tambah Agenda
            </button>

            {/* Modal Box */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3><FaCalendarAlt /> Form Tambah Agenda Pimpinan</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Tanggal Kegiatan:
                                <input
                                    type="date"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Waktu Kegiatan:
                                <select
                                    name="waktu"
                                    value={formData.waktu}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-Pilih Waktu-</option>
                                    <option value="Pagi">Pagi</option>
                                    <option value="Siang">Siang</option>
                                    <option value="Sore">Sore</option>
                                </select>
                            </label>
                            <label>
                                Tempat Kegiatan:
                                <input
                                    type="text"
                                    name="tempat"
                                    value={formData.tempat}
                                    onChange={handleChange}
                                    placeholder="Masukkan Tempat"
                                    required
                                />
                            </label>
                            <label>
                                Agenda Kegiatan:
                                <textarea
                                    name="agenda"
                                    value={formData.agenda}
                                    onChange={handleChange}
                                    placeholder="Masukkan Agenda"
                                    required
                                ></textarea>
                            </label>
                            <button type="submit">Simpan</button>
                            <button
                                type="button"
                                className="close-modal-button"
                                onClick={() => setIsModalOpen(false)}
                            >Tutup</button>
                        </form>
                    </div>
                </div>
            )}

            <h3>Daftar Agenda Pimpinan:</h3>
            {agendaList.length > 0 ? (
                <table className="agenda-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Tempat</th>
                            <th>Agenda</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendaList.map((agenda, index) => (
                            <tr key={agenda.id}>
                                <td>{index + 1}</td>
                                <td>{agenda.tanggal}</td>
                                <td>{agenda.waktu}</td>
                                <td>{agenda.tempat}</td>
                                <td>{agenda.agenda}</td>
                                <td>
                                    <button onClick={() => handleDelete(agenda.id)}>
                                        <FaTrashAlt /> Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Belum ada agenda yang disimpan.</p>
            )}

            {/* Back to Home Button */}
            <button onClick={() => navigate('/')} className="back-home-button">
                Kembali ke Beranda
            </button>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Created with <i className="fa fa-heart"></i> by AS <br />All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Agenda;
