import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaTrophy, FaChartLine, FaRedo, FaHome, FaShare, FaDownload } from 'react-icons/fa';

const ResultPage = () => {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem('result') || '{}');

  // Data talent dengan deskripsi
  const talentDescriptions = {
    Basket: 'Olahraga tim yang mengembangkan kelincahan, kerja sama, dan strategi.',
    Futsal: 'Permainan bola cepat dengan teknik tinggi dan kerjasama tim solid.',
    Tari: 'Ekspresi seni melalui gerakan tubuh yang harmonis dan ritmis.',
    Band: 'Berkreasi dengan musik, mengasah kreativitas dan harmoni nada.',
    Chef: 'Seni memasak yang memadukan kreativitas dan cita rasa.',
    Silat: 'Seni bela diri tradisional yang melatih kedisiplinan dan ketangkasan.',
    Dance: 'Gerakan ekspresif yang menggabungkan seni dan kebugaran tubuh.',
    Cooking: 'Kemampuan mengolah bahan makanan menjadi hidangan lezat dan bergizi.',
    'Tapak Suci': 'Seni bela diri berbasis keislaman yang mengajarkan disiplin dan ketahanan diri.',
    Math: 'Kemampuan berpikir logis, analitis, dan memecahkan masalah numerik.',
    English: 'Penguasaan bahasa internasional untuk komunikasi global.',
    'Art & Science': 'Perpaduan kreativitas seni dan pengetahuan ilmiah untuk inovasi.',
    Assemble: 'Keahlian merakit komponen elektronik dan mekanik.',
    DKV: 'Desain Komunikasi Visual untuk menciptakan karya seni terapan.',
    Coding: 'Kemampuan memprogram komputer dan mengembangkan perangkat lunak.',
    Drone: 'Keahlian mengoperasikan dan merakit pesawat tanpa awak untuk berbagai keperluan.'
  };

  if (!result.recommendedTalent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600 mb-4">Belum ada hasil tes. Silakan ikuti tes terlebih dahulu.</p>
          <button 
            onClick={() => navigate('/quiz')} 
            className="bg-gradient-to-r from-blue-400 to-orange-400 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
          >
            Mulai Tes
          </button>
        </div>
      </div>
    );
  }

  // Format data untuk chart pie dan bar
  const scoresArray = Object.entries(result.scores || {})
    .map(([talent, score]) => ({
      name: talent,
      value: score,
      percentage: (score * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  const topTalent = scoresArray[0];
  
  // Warna untuk chart - menggunakan palet biru dan oranye
  const COLORS = ['#3B82F6', '#F59E0B', '#60A5FA', '#F97316', '#93C5FD', '#FDBA74'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-blue-400">{payload[0].value * 100}%</p>
        </div>
      );
    }
    return null;
  };

  const handleShare = () => {
    const text = `Hasil Tes TalentFinder: Saya mendapatkan rekomendasi talenta ${result.recommendedTalent} dengan skor ${(topTalent.value * 100).toFixed(1)}%! Yuk coba juga!`;
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Tes TalentFinder',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Hasil disalin ke clipboard!');
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `talent_result_${new Date().toISOString().slice(0,10)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-400 to-orange-400 p-3 rounded-2xl mb-4">
            <FaTrophy className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Hasil Rekomendasi Talenta</h1>
          <p className="text-gray-600">Berdasarkan tes minat dan bakat yang telah kamu ikuti</p>
        </div>

        {/* Card Talent Utama - gradien biru ke oranye */}
        <div className="bg-gradient-to-r from-blue-400 to-orange-400 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-100 text-lg">Talenta yang direkomendasikan untukmu:</p>
              <p className="text-5xl md:text-6xl font-bold mt-2 mb-3">{result.recommendedTalent}</p>
              <p className="text-blue-100 max-w-md">
                {talentDescriptions[result.recommendedTalent] || 'Talenta yang sesuai dengan minat dan kemampuanmu.'}
              </p>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="text-7xl font-bold">{topTalent.percentage}%</div>
                <div className="text-orange-200 text-sm mt-1">Tingkat Kecocokan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Donut Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-400" /> Distribusi Skor Talenta
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoresArray}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {scoresArray.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">* Persentase menunjukkan tingkat probabilitas talenta</p>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-orange-400" /> Perbandingan Skor
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={scoresArray}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[0, 8, 8, 0]}>
                    {scoresArray.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabel Skor Detail */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detail Skor Probabilitas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Talenta</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Skor</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {scoresArray.map((talent, idx) => (
                  <tr key={talent.name} className="border-b border-gray-100 hover:bg-blue-50 transition">
                    <td className="py-3 px-4 font-medium">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                      {talent.name}
                    </td>
                    <td className="text-right py-3 px-4">{talent.value.toFixed(3)}</td>
                    <td className="text-right py-3 px-4 font-semibold text-orange-400">{talent.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons - semuanya menggunakan gradien biru-oranye atau solid biru/oranye */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-xl hover:bg-blue-400 hover:rounded-full hover:shadow-lg transition-all duration-300"
          >
            <FaHome /> Kembali ke Dashboard
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-xl hover:bg-blue-400 hover:rounded-full transition-all duration-300"
          >
            <FaRedo /> Ulangi Tes
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-xl hover:bg-blue-400 hover:rounded-full transition-all duration-300"
          >
            <FaShare /> Bagikan Hasil
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 border border-orange-400 text-orange-400 rounded-xl hover:bg-blue-400 hover:text-white hover:rounded-full hover:border-transparent transition-all duration-300"
          >
            <FaDownload /> Simpan Hasil
          </button>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="italic"> "Bakat adalah anugerah, tetapi yang lebih berharga adalah keberanian untuk mengembangkannya." </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;