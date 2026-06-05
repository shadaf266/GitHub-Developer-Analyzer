import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import ScoreCard from "../components/ScoreCard";
import RecommendationList from "../components/RecommendationList";
import History from "../components/History";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [report, setReport] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load history
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];

    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const normalizeUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }

    return url;
  };

  const fetchReport = async (username) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error("GitHub user not found");
      }

      const data = await response.json();

      setReport(data);

      // Functional update
      setHistory((prev) => {
        const exists = prev.find((item) => item.username === username);

        if (exists) return prev;

        return [
          {
            id: Date.now(),
            username,
          },
          ...prev,
        ];
      });

      // Dynamic recommendations
      const tips = [];

      if (data.public_repos < 10) {
        tips.push("Build more public projects.");
      }

      if (data.followers < 20) {
        tips.push("Increase GitHub visibility and networking.");
      }

      if (!data.bio) {
        tips.push("Add a professional GitHub bio.");
      }

      if (!data.blog) {
        tips.push("Add your portfolio website.");
      }

      if (tips.length === 0) {
        tips.push("Excellent GitHub profile!");
      }

      setRecommendations(tips);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scores = {
    followers: report?.followers || 0,
    following: report?.following || 0,
    repos: report?.public_repos || 0,
    gists: report?.public_gists || 0,
  };

  return (
    <div className="container">
      <h1>GitHub Developer Analyzer</h1>
      <p className="subtitle">
        Analyze GitHub profiles, repositories, followers, and developer
        activity.
      </p>

      <SearchForm
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAnalyze={() => fetchReport(searchTerm)}
      />

      {loading && <p className="loading">Analyzing website...</p>}

      {error && <p className="error">{error}</p>}

      {report && (
        <div className="profile-card">
          <img src={report.avatar_url} alt={report.login} className="avatar" />

          <div>
            <h2>{report.name || report.login}</h2>

            <p>{report.bio}</p>

            <a href={report.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      )}

      {report && (
        <>
          <div className="score-grid">
            <ScoreCard title="Followers" score={scores.followers} />

            <ScoreCard title="Following" score={scores.following} />

            <ScoreCard title="Repositories" score={scores.repos} />

            <ScoreCard title="Public Gists" score={scores.gists} />
          </div>

          <RecommendationList recommendations={recommendations} />
        </>
      )}
      <div className="history-container">
        <History history={history} onSelectUrl={setSearchTerm} />
      </div>
    </div>
  );
}

export default Home;
