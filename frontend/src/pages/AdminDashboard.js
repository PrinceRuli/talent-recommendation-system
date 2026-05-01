import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaQuestionCircle, FaChartLine, FaServer, 
  FaTrophy, FaUserPlus, FaTrash, FaPlus, FaUserCog,
  FaCheckCircle, FaTimesCircle, FaSync,
} from 'react-icons/fa';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [talents, setTalents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [mlStatus, setMlStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.name || 'Admin');
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
  }, [navigate]);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const { data } = await adminAPI.getStats();
        setStats(data);
      } else if (activeTab === 'users') {
        const { data } = await adminAPI.getUsers();
        setUsers(data);
      } else if (activeTab === 'talents') {
        const { data } = await adminAPI.getTalents();
        setTalents(data);
      } else if (activeTab === 'questions') {
        const { data } = await adminAPI.getQuestions();
        setQuestions(data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      if (err.response?.status === 403) {
        alert('Akses ditolak. Anda bukan admin.');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, navigate]);

  const checkMLStatus = React.useCallback(async () => {
    try {
      const { data } = await adminAPI.checkMLStatus();
      setMlStatus(data);
    } catch (err) {
      setMlStatus({ status: 'offline', error: 'Cannot connect' });
    }
  }, []);

  useEffect(() => {
    fetchData();
    checkMLStatus();
  }, [fetchData, checkMLStatus]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('result');
    navigate('/login');
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Yakin ingin menghapus?')) {
      try {
        if (type === 'user') await adminAPI.deleteUser(id);
        else if (type === 'talent') await adminAPI.deleteTalent(id);
        else if (type === 'question') await adminAPI.deleteQuestion(id);
        fetchData();
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Gagal menghapus');
      }
    }
  };

  // Tab configuration dengan warna blue-400 dan orange-400
  const tabs = [
    { id: 'stats', label: 'Statistik', icon: FaChartLine, color: 'from-blue-400 to-cyan-400' },
    { id: 'users', label: 'Manajemen User', icon: FaUsers, color: 'from-blue-400 to-cyan-400' },
    { id: 'talents', label: 'Manajemen Talenta', icon: FaTrophy, color: 'from-orange-400 to-yellow-400' },
    { id: 'questions', label: 'Manajemen Soal', icon: FaQuestionCircle, color: 'from-orange-400 to-yellow-400' },
    { id: 'ml-status', label: 'ML Service', icon: FaServer, color: 'from-orange-400 to-yellow-400' }
  ];

  if (loading && activeTab !== 'ml-status') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header dengan gradien blue-400 ke orange-400 */}
      <div className="relative bg-gradient-to-r from-blue-400 to-orange-400 text-white overflow-hidden">       
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaUserCog className="text-4xl" />
              <div>
                <h1 className="text-2xl font-bold">Admin Panel, {userName}!</h1>
                <p className="text-gray-100">Kelola sistem TalentFinder</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
            >
               Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Cards - warna tab aktif menggunakan blue-400 & orange-400 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300
                ${activeTab === tab.id 
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105` 
                  : 'bg-white text-gray-600 hover:shadow-md hover:scale-102'
                }
              `}
            >
              <tab.icon className="text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* STATISTICS TAB */}
          {activeTab === 'stats' && stats && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6"> Statistik Sistem</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border border-blue-400 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <FaUsers className="text-3xl text-blue-400" />
                    <span className="text-3xl font-bold text-blue-400">{stats.totalUsers}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Total User</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.totalStudents} siswa, {stats.totalAdmins} admin
                  </p>
                </div>
                
                <div className="border border-blue-400 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <FaQuestionCircle className="text-3xl text-blue-400" />
                    <span className="text-3xl font-bold text-blue-400">{stats.totalQuestions}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Total Pertanyaan</h3>
                </div>
                
                <div className="border border-blue-400 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <FaChartLine className="text-3xl text-blue-400" />
                    <span className="text-3xl font-bold text-blue-400">{stats.totalResults}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">Total Tes</h3>
                </div>
                
                <div className="border border-blue-400 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <FaUserPlus className="text-3xl text-blue-400" />
                    <span className="text-3xl font-bold text-blue-400">{stats.newUsersToday}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700">User Baru Hari Ini</h3>
                </div>
              </div>

              {/* Talent Distribution Chart - gradien biru ke oranye */}
              {stats.talentStats && stats.talentStats.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribusi Rekomendasi Talenta</h3>
                  <div className="space-y-3">
                    {stats.talentStats.map((talent, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{talent._id}</span>
                          <span>{talent.count} user</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(talent.count / stats.totalResults) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800"> Manajemen User</h2>
                <span className="text-sm text-gray-500">Total: {users.length} user</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3">Nama</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Sekolah</th>
                      <th className="text-left p-3">Kelas</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3">{user.school}</td>
                        <td className="p-3">{user.class}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-orange-400 text-white' 
                              : 'bg-blue-400 text-white'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Siswa'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDelete('user', user._id)}
                            className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
                            disabled={user.role === 'admin'}
                            title={user.role === 'admin' ? 'Tidak dapat menghapus admin' : 'Hapus user'}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TALENTS TAB */}
          {activeTab === 'talents' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800"> Manajemen Talenta</h2>
                <button
                  onClick={() => {
                    setModalType('talent');
                    setEditingItem(null);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-400 hover:rounded-full transition-all duration-300"
                >
                  <FaPlus /> Tambah Talenta
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {talents.map(talent => (
                  <div key={talent._id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl">{talent.icon}</span>
                        <h3 className="text-xl font-bold text-gray-800">{talent.name}</h3>
                      </div>
                      <button
                        onClick={() => handleDelete('talent', talent._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{talent.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUESTIONS TAB */}
          {activeTab === 'questions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800"> Manajemen Pertanyaan</h2>
                <button
                  onClick={() => {
                    setModalType('question');
                    setEditingItem(null);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-400 hover:rounded-full transition-all duration-300"
                >
                  <FaPlus /> Tambah Pertanyaan
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3">Pertanyaan</th>
                      <th className="text-left p-3">Kategori</th>
                      <th className="text-left p-3">Urutan</th>
                      <th className="text-left p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map(q => (
                      <tr key={q._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{q.questionText}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                            {q.category}
                          </span>
                        </td>
                        <td className="p-3">{q.order}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDelete('question', q._id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ML STATUS TAB - menggunakan warna biru dan oranye */}
          {activeTab === 'ml-status' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800"> ML Service Monitor</h2>
                <button
                  onClick={checkMLStatus}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-400 hover:rounded-full transition-all duration-300"
                >
                  <FaSync /> Refresh
                </button>
              </div>
              <div className={`rounded-xl p-8 text-center ${
                mlStatus?.status === 'online' 
                  ? 'bg-gradient-to-r from-blue-50 to-orange-50' 
                  : 'bg-gradient-to-r from-red-50 to-rose-50'
              }`}>
                <div className="flex flex-col items-center gap-4">
                  {mlStatus?.status === 'online' ? (
                    <FaCheckCircle className="text-blue-400 text-6xl" />
                  ) : (
                    <FaTimesCircle className="text-orange-400 text-6xl" />
                  )}
                  <div>
                    <p className="text-2xl font-bold">
                      Status: {mlStatus?.status === 'online' ? '✅ Online' : '❌ Offline'}
                    </p>
                    {mlStatus?.error && (
                      <p className="text-sm text-red-600 mt-2">{mlStatus.error}</p>
                    )}
                    {mlStatus?.responseTime && (
                      <p className="text-sm text-gray-500 mt-1">Response Time: {mlStatus.responseTime}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>TalentFinder Admin Panel - Kelola sistem dengan mudah </p>
        </div>
      </div>

      {/* Modal untuk Add/Edit - juga disesuaikan warnanya */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit' : 'Tambah'} {modalType === 'talent' ? 'Talenta' : 'Pertanyaan'}
            </h3>
            <div className="space-y-4">
              {modalType === 'talent' && (
                <>
                  <input 
                    placeholder="Nama Talenta" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea 
                    placeholder="Deskripsi" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    rows="3"
                  />
                  <input 
                    placeholder="Icon (emoji)" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </>
              )}
              {modalType === 'question' && (
                <>
                  <textarea 
                    placeholder="Pertanyaan" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    rows="2"
                  />
                  <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="fisik">Fisik & Olahraga</option>
                    <option value="teamwork">Kerja Sama Tim</option>
                    <option value="seni">Seni & Kreativitas</option>
                    <option value="musik">Musik & Irama</option>
                    <option value="memasak">Memasak & Kuliner</option>
                    <option value="bela_diri">Bela Diri</option>
                  </select>
                  <input 
                    type="number" 
                    placeholder="Urutan" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                Batal
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-orange-400 text-white rounded-lg hover:shadow-md transition">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;