import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePage.css'; // Import CSS untuk komponen ini

const WelcomePage = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const navigateToAgenda = () => {
    navigate('/agenda'); // Arahkan ke halaman agenda
  };

  return (
    <div className="welcome-container">
      <h1>Selamat Datang di Sistem Manajemen Agenda Pimpinan</h1>
      <p>Kelola setiap kegiatan dinas luar anda. </p>
      <button onClick={navigateToAgenda} className="btn-start">
        <i className="fas fa-hand-pointer"></i> Mulai
      </button>
    </div>
  );
};

export default WelcomePage;
