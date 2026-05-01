import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaGoogle, FaFacebook } from 'react-icons/fa';
import API from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    school: '', 
    class: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role || 'student'
      }));

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Registrasi gagal. Periksa kembali data Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-md w-full">
        {/* Tombol Back */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-700 hover:text-orange-400 mb-6 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Beranda
        </Link>

        {/* Card Register */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-400">
          <h2 className="text-3xl font-bold text-blue-400 text-center mb-2">Buat Akun Baru</h2>
          <p className="text-orange-400 text-center mb-8">Daftar untuk memulai</p>

          <form onSubmit={handleSubmit}>
            {/* Nama Lengkap */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                placeholder="Steven Elephant"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="stevenelephant@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Sekolah */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Sekolah
              </label>
              <input
                name="school"
                type="text"
                placeholder="SMP Muhammadiyah 8 Jakarta"
                value={form.school}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                required
              />
            </div>

            {/* Kelas */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Kelas
              </label>
              <input
                name="class"
                type="text"
                placeholder="7 Makkah 1"
                value={form.class}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-blue-400 hover:rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Daftar
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-400 hover:text-orange-400 font-medium transition-colors">
              Login
            </Link>
          </p>

          {/* Social Sign Up */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau daftar dengan</span>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-orange-400 rounded-lg bg-white text-orange-400 hover:bg-blue-400 hover:text-white hover:rounded-full hover:border-transparent transition-all duration-300">
                <FaGoogle /> Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-orange-400 rounded-lg bg-white text-orange-400 hover:bg-blue-400 hover:text-white hover:rounded-full hover:border-transparent transition-all duration-300">
                <FaFacebook /> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;