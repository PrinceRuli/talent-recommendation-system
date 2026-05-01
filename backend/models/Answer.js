const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scores: {
    Fisik: Number,
    Tim: Number,
    SeniVisual: Number,
    Musik: Number,
    Memasak: Number,
    BelaDiri: Number,
    Logika: Number,
    Bahasa: Number,
    Sains: Number,
    Desain: Number,
    Teknologi: Number,
    Mekanik: Number
  },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', AnswerSchema);