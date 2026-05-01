import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaChartLine, FaStar, FaClock, FaArrowRight } from 'react-icons/fa';
import API from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    // Ambil nama user dari localStorage atau API
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.name || 'Siswa');
    
    // Ambil hasil tes terakhir (jika ada)
    const fetchLastResult = async () => {
      try {
        const { data } = await API.get('/quiz/my-result');
        if (data) {
          setLastResult(data);
          // Simpan hasil ke localStorage untuk akses cepat di halaman result
          localStorage.setItem('result', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching last result:', error);
      }
    };

    fetchLastResult();
  }, []);

  const handleStart = () => navigate('/quiz');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('result');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header dengan gradien blue-400 ke orange-400 */}
      <div className="relative bg-gradient-to-r from-blue-400 to-orange-400 text-white overflow-hidden">       
        {/* Content header */}
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-4xl" />
              <div>
                <h1 className="text-2xl font-bold">Halo, {userName}!</h1>
                <p className="text-blue-100">Selamat datang di TalentFinder</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section - Motivasi (tanpa background berlebihan) */}
        <div className="rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl text-blue-400 font-bold mb-2">Temukan Potensi Terbaikmu!</h2>
              <p className="text-orange-400 text-lg">
                Setiap orang memiliki bakat unik. Yuk, cari tahu talenta apa yang cocok untukmu!
              </p>
            </div>            
          </div>
        </div>

        {/* Statistik atau Info Cepat - semua icon dan angka menggunakan blue-400 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-b-2 border-blue-400">
            <div className="flex items-center justify-between mb-3">
              <FaChartLine className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">6+</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Jenis Talenta</h3>
            <p className="text-sm text-gray-500">Basket, Futsal, Tari, Band, Chef, Silat</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-b-2 border-orange-400">
            <div className="flex items-center justify-between mb-3">
              <FaStar className="text-3xl text-orange-400" /> {/* Ubah ke orange-400 */}
              <span className="text-2xl font-bold text-orange-400">AI-Based</span> {/* Ubah ke orange-400 */}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Rekomendasi Akurat</h3>
            <p className="text-sm text-gray-500">Didukung teknologi machine learning</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-b-2 border-blue-400">
            <div className="flex items-center justify-between mb-3">
              <FaClock className="text-3xl text-blue-400" /> {/* Hijau -> biru */}
              <span className="text-2xl font-bold text-blue-400">10 Menit</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Tes Singkat</h3>
            <p className="text-sm text-gray-500">Hanya butuh waktu sebentar</p>
          </div>
        </div>

        {/* Hasil Tes Terakhir - skema orange (karena highlight) */}
        {lastResult && (
          <div className="mb-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
              🧡 Hasil Tes Terakhir
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-700">Talenta yang direkomendasikan:</p>
                <p className="text-3xl font-bold text-orange-500">{lastResult.recommendedTalent}</p>
              </div>
              <button
                onClick={() => navigate('/result')}
                className="px-5 py-2 bg-orange-400 hover:bg-blue-400 text-white rounded-lg hover:rounded-full transition-all duration-300 flex items-center gap-2"
              >
                Lihat Detail <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* CTA Mulai Tes */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {lastResult ? 'Coba Lagi?' : 'Siap Menemukan Bakatmu?'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {lastResult 
                ? 'Ikuti tes lagi untuk mendapatkan rekomendasi baru atau verifikasi hasil sebelumnya.'
                : 'Kerjakan tes minat dan bakat sekarang dan temukan talenta yang sesuai dengan dirimu.'}
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-orange-400 hover:bg-blue-400 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
            >
              Mulai Tes Sekarang <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Footer motivasi */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p> "Bakat terbaik adalah bakat yang ditemukan dan dikembangkan." </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;