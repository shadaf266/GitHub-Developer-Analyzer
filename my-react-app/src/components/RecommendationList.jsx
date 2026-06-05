import React, { useEffect } from "react";

function RecommendationList({ recommendations }) {
  useEffect(() => {
    console.log(
      "Recommendations updated:",
      recommendations.length
    );
  }, [recommendations]);

  if (!recommendations.length) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className="recommendation-list">
      <h2>Recommendations</h2>

      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;