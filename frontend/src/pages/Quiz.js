import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import API from '../services/api';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(null);
  const navigate = useNavigate();

  const categories = [
    'Fisik', 'Tim', 'SeniVisual', 'Musik', 'Memasak', 'BelaDiri',
    'Logika', 'Bahasa', 'Sains', 'Desain', 'Teknologi', 'Mekanik'
  ];
  
  const categoryNames = {
    Fisik: ' Fisik & Atletik',
    Tim: ' Kerja Sama Tim',
    SeniVisual: ' Seni Visual',
    Musik: ' Musik & Auditori',
    Memasak: ' Memasak & Kuliner',
    BelaDiri: ' Bela Diri & Disiplin',
    Logika: ' Logika & Matematika',
    Bahasa: ' Bahasa & Linguistik',
    Sains: ' Sains & Pengetahuan',
    Desain: ' Desain & Kreativitas',
    Teknologi: ' Teknologi & Coding',
    Mekanik: ' Mekanik & Perakitan'
  };
  
  const categoryIcons = {
    Fisik: '⚡',
    Tim: '🤝',
    SeniVisual: '🎨',
    Musik: '🎵',
    Memasak: '🍳',
    BelaDiri: '🥋',
    Logika: '🧠',
    Bahasa: '📖',
    Sains: '🔬',
    Desain: '🎨',
    Teknologi: '💻',
    Mekanik: '🔧'
  };

  const scaleDescriptions = {
    1: 'Sangat Tidak Setuju',
    2: 'Tidak Setuju',
    3: 'Netral',
    4: 'Setuju',
    5: 'Sangat Setuju'
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get('/questions');
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Gagal mengambil pertanyaan');
        navigate('/dashboard');
      }
    };
    fetchQuestions();
  }, [navigate]);

  const grouped = questions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {});

  const calculateCategoryAverages = () => {
    const averages = {};
    for (const category of categories) {
      const catQuestions = grouped[category] || [];
      const catAnswers = catQuestions.map(q => answers[q._id]).filter(v => v !== undefined);
      if (catAnswers.length > 0) {
        const sum = catAnswers.reduce((a, b) => a + b, 0);
        averages[category] = Math.round(sum / catAnswers.length);
      } else {
        averages[category] = 0;
      }
    }
    return averages;
  };

  const isCategoryComplete = (category) => {
    const catQuestions = grouped[category] || [];
    return catQuestions.length > 0 && catQuestions.every(q => answers[q._id] !== undefined);
  };

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleNext = () => {
    const currentCat = categories[currentCategoryIndex];
    if (!isCategoryComplete(currentCat)) {
      alert(`Silakan jawab semua pertanyaan untuk kategori ${categoryNames[currentCat]}`);
      return;
    }
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const cat of categories) {
      if (!isCategoryComplete(cat)) {
        alert(`Silakan jawab semua pertanyaan untuk kategori ${categoryNames[cat]}`);
        setCurrentCategoryIndex(categories.indexOf(cat));
        return;
      }
    }
    try {
      const categoryAverages = calculateCategoryAverages();
      const response = await API.post('/quiz/submit', { scores: categoryAverages });
      localStorage.setItem('result', JSON.stringify(response.data));
      navigate('/result');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Gagal mengirim jawaban';
      alert(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pertanyaan...</p>
        </div>
      </div>
    );
  }

  const currentCat = categories[currentCategoryIndex];
  const currentQuestions = grouped[currentCat] || [];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Tes Minat & Bakat
          </h1>
          <p className="text-gray-600 mb-4">Temukan talenta terbaik yang sesuai dengan dirimu</p>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {answeredQuestions} dari {totalQuestions} pertanyaan
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-400 to-orange-400 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            {/* Header kategori dengan gradien biru ke oranye */}
            <div className="bg-gradient-to-r from-blue-400 to-orange-400 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl mr-3">{categoryIcons[currentCat]}</span>
                  <h2 className="text-2xl font-bold">{categoryNames[currentCat]}</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Pertanyaan {currentCategoryIndex + 1} dari {categories.length}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full px-4 py-2">
                  <span className="font-bold">
                    {currentQuestions.filter(q => answers[q._id]).length}/{currentQuestions.length}
                  </span>
                  <span className="text-sm ml-1">terjawab</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {currentQuestions.map((q, idx) => {
                const currentAnswer = answers[q._id];
                return (
                  <div key={q._id} className="border-b border-gray-100 pb-4 last:border-0">
                    <p className="text-gray-800 font-medium mb-3">
                      {idx + 1}. {q.questionText}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label
                          key={val}
                          className="relative group cursor-pointer"
                          onMouseEnter={() => setShowTooltip(val)}
                          onMouseLeave={() => setShowTooltip(null)}
                        >
                          <input
                            type="radio"
                            name={`question-${q._id}`}
                            value={val}
                            checked={currentAnswer === val}
                            onChange={() => handleChange(q._id, val)}
                            className="hidden peer"
                          />
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                            transition-all duration-200 cursor-pointer
                            ${currentAnswer === val 
                              ? 'bg-orange-400 text-white shadow-lg scale-110' 
                              : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:scale-105'
                            }
                          `}>
                            {val}
                          </div>
                          {showTooltip === val && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                              {scaleDescriptions[val]}
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentCategoryIndex === 0}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                ${currentCategoryIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }
              `}
            >
              <FaArrowLeft /> Sebelumnya
            </button>

            {currentCategoryIndex < categories.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-xl font-semibold hover:bg-blue-400 hover:rounded-full hover:shadow-lg transition-all"
              >
                Selanjutnya <FaArrowRight />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-xl font-semibold hover:bg-blue-400 hover:rounded-full hover:shadow-lg transition-all"
              >
                <FaCheck /> Selesai & Lihat Hasil
              </button>
            )}
          </div>      
        </form>
      </div>
    </div>
  );
};

export default Quiz;