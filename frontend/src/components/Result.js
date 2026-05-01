const Result = ({ result }) => {
  const { recommendedTalent, scores } = result;

  // Urutkan scores dari tertinggi ke terendah
  const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);

  return (
    <div>
      <h3>Bakat yang direkomendasikan: <strong>{recommendedTalent}</strong></h3>
      <h4>Skor probabilitas per bakat:</h4>
      <ul>
        {sorted.map(([talent, prob]) => (
          <li key={talent}>{talent}: {(prob * 100).toFixed(2)}%</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;