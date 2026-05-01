const mongoose = require('mongoose');   // ← Baris ini wajib ada

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: {
    type: String,
    enum: ['Fisik','Tim','SeniVisual','Musik','Memasak','BelaDiri','Logika','Bahasa','Sains','Desain','Teknologi','Mekanik'],
    required: true
  },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Question', QuestionSchema);