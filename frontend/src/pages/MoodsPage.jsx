import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api.js';

const moods = [
  ['1', 'Heavy'],
  ['2', 'Low'],
  ['3', 'Okay'],
  ['4', 'Good'],
  ['5', 'Bright'],
];

export default function MoodsPage() {
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchMoods = async () => {
    setLoading(true);

    try {
      const data = await apiRequest('/api/moods');

      if (Array.isArray(data)) {
        setEntries(data);
      } else {
        setEntries([]);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const saveMood = async () => {
    if (!selectedMood) return;

    try {
      await apiRequest('/api/moods', {
        method: 'POST',
        body: JSON.stringify({
          mood: selectedMood,
          note,
        }),
      });

      setMessage('Mood saved successfully 💜');
      setSelectedMood(null);
      setNote('');

      fetchMoods();
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Mood Journal</span>

        <h2>How are you feeling today?</h2>

        <p>
          Track your emotional patterns and leave small notes for yourself.
        </p>
      </section>

      <section className="panel">
        <div className="mood-grid">
          {moods.map(([value, label]) => (
            <button
              key={value}
              className={`mood-card ${
                selectedMood === parseInt(value)
                  ? 'selected'
                  : ''
              }`}
              onClick={() => setSelectedMood(parseInt(value))}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write a small note..."
          rows="4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={saveMood}
          disabled={!selectedMood}
        >
          Save Mood
        </button>

        {message && (
          <div className="notice success">
            {message}
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Previous Entries</h3>

        {loading && (
          <p className="muted">
            Loading moods...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <p className="muted">
            No mood entries yet.
          </p>
        )}

        <div className="list-stack">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-row">
              <strong>
                {moods[entry.mood - 1]?.[1] || 'Mood'}
              </strong>

              <p>
                {entry.note || 'No note added'}
              </p>

              <small>
                {entry.created_at}
              </small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}