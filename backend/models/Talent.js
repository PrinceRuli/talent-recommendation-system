const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  icon: String // misal nama file gambar
});

module.exports = mongoose.model('Talent', TalentSchema);
