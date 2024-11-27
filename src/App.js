import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router dan Route
import WelcomePage from './componets/WelcomePage'; // Impor WelcomePage
import Agenda from './componets/Agenda'; // Impor komponen Agenda

const App = () => {
  return (
    <Router> {/* Membungkus aplikasi dengan Router */}
      <Routes>
        {/* Menampilkan halaman WelcomePage di root path ("/") */}
        <Route path="/" element={<WelcomePage />} />

        {/* Menampilkan halaman Agenda di path "/agenda" */}
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </Router>
  );
};

export default App;
