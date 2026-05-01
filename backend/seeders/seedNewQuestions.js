const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const questions = [
  // Fisik
  { questionText: 'Saya suka melakukan aktivitas fisik seperti lari, lompat, atau olahraga berat', category: 'Fisik', order: 1 },
  { questionText: 'Saya merasa energik setelah berolahraga', category: 'Fisik', order: 2 },
  // Tim
  { questionText: 'Saya lebih suka bekerja dalam tim daripada sendiri', category: 'Tim', order: 3 },
  { questionText: 'Saya mudah beradaptasi dengan anggota tim baru', category: 'Tim', order: 4 },
  // SeniVisual
  { questionText: 'Saya senang menggambar, melukis, atau membuat karya seni visual', category: 'SeniVisual', order: 5 },
  { questionText: 'Saya tertarik mengunjungi pameran seni atau galeri', category: 'SeniVisual', order: 6 },
  // Musik
  { questionText: 'Saya suka bermain alat musik (gitar, piano, drum, dll)', category: 'Musik', order: 7 },
  { questionText: 'Saya sering mendengarkan musik dan bisa membedakan nada', category: 'Musik', order: 8 },
  // Memasak
  { questionText: 'Saya suka mencoba resep masakan baru', category: 'Memasak', order: 9 },
  { questionText: 'Saya senang memasak untuk orang lain', category: 'Memasak', order: 10 },
  // BelaDiri
  { questionText: 'Saya tertarik dengan olahraga bela diri (karate, silat, taekwondo)', category: 'BelaDiri', order: 11 },
  { questionText: 'Saya memiliki kedisiplinan tinggi dalam latihan fisik', category: 'BelaDiri', order: 12 },
  // Logika
  { questionText: 'Saya suka memecahkan soal matematika atau teka-teki logika', category: 'Logika', order: 13 },
  { questionText: 'Saya tertarik pada pola angka dan pemecahan masalah sistematis', category: 'Logika', order: 14 },
  // Bahasa
  { questionText: 'Saya suka belajar bahasa asing (termasuk Inggris)', category: 'Bahasa', order: 15 },
  { questionText: 'Saya percaya diri berbicara atau menulis dalam bahasa Inggris', category: 'Bahasa', order: 16 },
  // Sains
  { questionText: 'Saya tertarik pada eksperimen sains dan penemuan ilmiah', category: 'Sains', order: 17 },
  { questionText: 'Saya suka membaca artikel tentang teknologi, fisika, atau biologi', category: 'Sains', order: 18 },
  // Desain
  { questionText: 'Saya senang mendesain grafis, poster, atau tata letak visual', category: 'Desain', order: 19 },
  { questionText: 'Saya memiliki rasa estetika yang tinggi (warna, komposisi, tipografi)', category: 'Desain', order: 20 },
  // Teknologi
  { questionText: 'Saya suka memprogram komputer atau menulis kode', category: 'Teknologi', order: 21 },
  { questionText: 'Saya tertarik pada algoritma, robotika, atau pengembangan aplikasi', category: 'Teknologi', order: 22 },
  // Mekanik
  { questionText: 'Saya suka merakit barang elektronik (komputer, drone, robot)', category: 'Mekanik', order: 23 },
  { questionText: 'Saya teliti dalam memasang komponen dan membaca skema teknis', category: 'Mekanik', order: 24 }
];

const seedDB = async () => {
  try {
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('Questions seeded successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();