const User = require('../models/User');
const Question = require('../models/Question');
const Result = require('../models/Result');
const Talent = require('../models/Talent'); // jika ada model Talent, buat dulu

// Statistik
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalQuestions = await Question.countDocuments();
    const totalResults = await Result.countDocuments();
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: new Date().setHours(0,0,0,0) }
    });
    // Distribusi talent dari hasil tes
    const talentStats = await Result.aggregate([
      { $group: { _id: '$recommendedTalent', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({
      totalUsers,
      totalStudents,
      totalAdmins,
      totalQuestions,
      totalResults,
      newUsersToday,
      talentStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User management
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Talent management (jika model Talent ada)
exports.getTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTalent = async (req, res) => {
  try {
    const talent = new Talent(req.body);
    await talent.save();
    res.status(201).json(talent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTalent = async (req, res) => {
  try {
    const talent = await Talent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(talent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTalent = async (req, res) => {
  try {
    await Talent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Talent deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Question management (dengan kategori baru)
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort('order');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ML Status check
exports.checkMLStatus = async (req, res) => {
  const axios = require('axios');
  try {
    const start = Date.now();
    await axios.post('http://localhost:5001/predict', {
      Fisik: 3, Tim: 3, SeniVisual: 3, Musik: 3, Memasak: 3,
      BelaDiri: 3, Logika: 3, Bahasa: 3, Sains: 3, Desain: 3,
      Teknologi: 3, Mekanik: 3
    }, { timeout: 3000 });
    const responseTime = `${Date.now() - start}ms`;
    res.json({ status: 'online', responseTime });
  } catch (error) {
    res.json({ status: 'offline', error: error.message });
  }
};