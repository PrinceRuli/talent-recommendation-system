import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import gambar hero (sesuaikan path dengan lokasi gambar Anda)
import heroBg from '../assets/talent.webp'; 

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Data 13 talent
  const talents = [
    {
      name: 'Basket',
      description: 'Olahraga tim yang membutuhkan kelincahan, kerja sama, dan strategi. Cocok bagi Anda yang suka bergerak aktif dan bekerja dalam tim.',
      detail: 'Mengembangkan fisik, strategi, dan komunikasi tim.',
      image: '/images/basket.webp',
    },
    {
      name: 'Futsal',
      description: 'Permainan bola cepat dengan teknik dan kerjasama tim. Melatih refleks, kecepatan, dan akurasi.',
      detail: 'Ideal untuk pengembangan kecepatan dan kerja sama.',
      image: '/images/futsal.webp',
    },
    {
      name: 'Dance',
      description: 'Ekspresi seni melalui gerakan tubuh yang harmonis dan ritmis. Mengasah kreativitas, kelenturan, dan ekspresi diri.',
      detail: 'Mengembangkan kepekaan seni dan koordinasi tubuh.',
      image: '/images/tari.webp',
    },
    {
      name: 'Cooking',
      description: 'Kreativitas memasak dan mengolah bahan makanan. Belajar teknik memasak, presentasi, dan cita rasa.',
      detail: 'Mengasah kreativitas kuliner dan ketelitian.',
      image: '/images/chef.webp',
    },
    {
      name: 'Tapak Suci',
      description: 'Seni bela diri berbasis keislaman yang melatih kedisiplinan, kekuatan, dan ketahanan diri.',
      detail: 'Mengembangkan kedisiplinan dan pertahanan diri.',
      image: '/images/silat.webp',
    },
    {
      name: 'Math',
      description: 'Kemampuan berpikir logis, analitis, dan memecahkan masalah numerik. Cocok bagi yang suka tantangan angka.',
      detail: 'Mengasah logika dan pemecahan masalah.',
      image: '/images/math.webp',
    },
    {
      name: 'English',
      description: 'Penguasaan bahasa internasional untuk komunikasi global. Membuka peluang karir dan pendidikan.',
      detail: 'Meningkatkan kemampuan berbahasa Inggris.',
      image: '/images/english.webp',
    },
    {
      name: 'Art & Science',
      description: 'Perpaduan kreativitas seni dan pengetahuan ilmiah untuk inovasi. Eksplorasi kedua bidang secara bersamaan.',
      detail: 'Mengembangkan kreativitas dan berpikir ilmiah.',
      image: '/images/art.webp',
    },
    {
      name: 'Band',
      description: 'Bermusik bersama, mengasah kreativitas dan harmoni. Belajar alat musik dan berkolaborasi dalam grup.',
      detail: 'Mengembangkan bakat musik dan kerja sama.',
      image: '/images/band.webp',
    },
    {
      name: 'Assemble',
      description: 'Keahlian merakit komponen elektronik dan mekanik. Cocok untuk yang suka tantangan teknis.',
      detail: 'Melatih ketelitian dan pemahaman rangkaian.',
      image: '/images/assemble.webp',
    },
    {
      name: 'DKV',
      description: 'Desain Komunikasi Visual untuk menciptakan karya seni terapan. Eksplorasi tipografi, ilustrasi, dan branding.',
      detail: 'Mengasah kreativitas visual dan estetika.',
      image: '/images/dkv.webp',
    },
    {
      name: 'Coding',
      description: 'Kemampuan memprogram komputer dan mengembangkan perangkat lunak. Belajar algoritma dan logika pemrograman.',
      detail: 'Membangun aplikasi dan sistem digital.',
      image: '/images/coding.webp',
    },
    {
      name: 'Drone',
      description: 'Keahlian mengoperasikan dan merakit pesawat tanpa awak. Eksplorasi teknologi penerbangan dan sensor.',
      detail: 'Mengembangkan kemampuan teknis dan navigasi.',
      image: '/images/drone.webp',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-blue-400">Talent</span>
            <span className="text-orange-400">Finder</span>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link 
              to="/login" 
              className="px-5 py-2 text-gray-700 border border-orange-400 rounded-lg hover:bg-blue-400 
              hover: hover:text-white
              hover:rounded-full hover:border-transparent transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-400 
              hover:rounded-full shadow-lg transition-all duration-300"
            >
              Daftar
            </Link>
          </div>

          <button
            className="md:hidden text-2xl focus:outline-none text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
            <Link 
              to="/login" 
              className="block text-center py-2 border border-orange-400 rounded-full text-gray-700 hover:bg-blue-400 hover:text-white hover:border-transparent
               transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block text-center py-2 bg-orange-400 text-white rounded-full hover:shadow-md
              hover:bg-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Daftar
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-blue-400">Temukan</span>{' '}
              <span className="text-orange-400">Bakat Terbaikmu</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Sistem rekomendasi talenta berbasis AI. Ikuti tes sederhana dan dapatkan rekomendasi talenta yang sesuai dengan minat dan kemampuanmu.
            </p>
            <Link 
              to="/register" 
              className="inline-block px-8 py-3 bg-orange-400 text-white text-lg font-semibold rounded-lg hover:bg-blue-400 hover:rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Mulai Tes Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Daftar Talent dengan Carousel */}
      <section id="talents" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-blue-400">Talenta</span>{' '}
            <span className="text-orange-400">yang Tersedia</span>
          </h2>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {talents.map((talent, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-400">
                  <img 
                    src={talent.image} 
                    alt={talent.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(talent.name);
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-400">{talent.name}</h3>
                    <p className="text-gray-600 mb-2">{talent.description}</p>
                    <p className="text-sm text-orange-400 font-medium">{talent.detail}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-400 to-orange-400 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} TalentFinder. All rights reserved.</p>
          <p className="text-sm text-white/80 mt-2">Membantu menemukan bakat terbaikmu</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;