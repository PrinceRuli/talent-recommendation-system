const Answer = require('../models/Answer');
const Result = require('../models/Result');
const axios = require('axios');
const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { scores } = req.body;
    const userId = req.user.id;

    // Simpan jawaban
    const answer = new Answer({ userId, scores });
    await answer.save();

    // Panggil ML service (Flask)
    const mlResponse = await axios.post('http://localhost:5001/predict', scores);
    const { recommendedTalent, scores: talentScores } = mlResponse.data;

    // Simpan hasil rekomendasi
    const result = new Result({ userId, recommendedTalent, scores: talentScores });
    await result.save();

    res.json({ recommendedTalent, scores: talentScores });
  } catch (error) {
    console.error('Quiz submit error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyLastResult = async (req, res) => {
  try {
    const result = await Result.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(result || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};