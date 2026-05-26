import { useEffect, useState } from 'react';
import { API_BASE } from '../services/api.js';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/articles`);

        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await res.json();

        setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Library</span>

        <h2>Small reads for calmer days.</h2>

        <p>
          Gentle reminders, mindfulness tips, and emotional wellness ideas.
        </p>
      </section>

      {loading && (
        <div className="panel">
          <p className="muted">
            Loading articles...
          </p>
        </div>
      )}

      {error && (
        <div className="notice error">
          {error}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="panel">
          <p className="muted">
            No articles available.
          </p>
        </div>
      )}

      <section className="article-grid">
        {articles.map((article) => (
          <article
            key={article.id}
            className="article-card"
          >
            <span>{article.category}</span>

            <h3>{article.title}</h3>

            <p>{article.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}