import React, { useEffect, useState, useRef } from "react";

function ScoreCard({ score,title }) {
  const [debouncedScore, setDebouncedScore] = useState(score);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScore(score);
    }, 500);

    return () => clearTimeout(handler);
  }, [score]);

  useEffect(() => {
    console.log("Debounced score updated:", debouncedScore);
  }, [debouncedScore]);

  return (
    <div className="score-card">
      <h2>{title}: {debouncedScore}</h2>
    </div>
  );
}

export default ScoreCard;