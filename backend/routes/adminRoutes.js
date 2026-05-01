const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getStats, getUsers, updateUser, deleteUser,
  getTalents, createTalent, updateTalent, deleteTalent,
  getQuestions, createQuestion, updateQuestion, deleteQuestion,
  checkMLStatus
} = require('../controllers/adminController');

// Semua route di bawah hanya untuk admin
router.use(protect, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/talents', getTalents);
router.post('/talents', createTalent);
router.put('/talents/:id', updateTalent);
router.delete('/talents/:id', deleteTalent);
router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);
router.get('/ml-status', checkMLStatus);

module.exports = router;