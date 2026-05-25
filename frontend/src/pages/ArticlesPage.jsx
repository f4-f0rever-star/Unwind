import { useEffect, useState } from 'react';
import { API_BASE } from '../services/api.js';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Library</span>
        <h2>Small reads for steadier days.</h2>
        <p>Short self-care ideas, reflections, and reminders.</p>
      </section>

      <section className="article-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <span>{article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}