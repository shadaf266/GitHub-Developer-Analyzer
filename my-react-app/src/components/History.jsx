import React, { useEffect } from "react";

function History({
  history,
  onSelectUrl
}) {

  useEffect(() => {
    console.log(
      "History changed:",
      history
    );
  }, [history]);

  if (!history.length) {
    return (
      <div className="history">
        <h2>Recent Searches</h2>
        <p>No search history.</p>
      </div>
    );
  }

  return (
    <div className="history">
      <h2>Recent Searches</h2>

      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <button
              onClick={() =>
                onSelectUrl(item.username)
              }
            >
              {item.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;