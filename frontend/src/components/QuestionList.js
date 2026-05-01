import { useState, useEffect } from 'react';

const QuestionList = ({ questions, onAnswer }) => {
  // Kelompokkan pertanyaan berdasarkan kategori
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const groups = {};
    questions.forEach(q => {
      if (!groups[q.category]) groups[q.category] = [];
      groups[q.category].push(q);
    });
    setGrouped(groups);
  }, [questions]);

  const handleScoreChange = (category, score) => {
    onAnswer(category, parseInt(score, 10));
  };

  return (
    <div>
      {Object.entries(grouped).map(([category, qs]) => (
        <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Kategori: {category}</h3>
          {qs.map(q => (
            <p key={q._id}>{q.questionText}</p>
          ))}
          <label>Skor (1-5): </label>
          <select onChange={(e) => handleScoreChange(category, e.target.value)}>
            <option value="">Pilih</option>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;