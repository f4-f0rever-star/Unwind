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
  const [loading, setLoading] = useState(true);

  const fetchMoods = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/moods');
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const saveMood = async () => {
    if (!selectedMood) return;

    await apiRequest('/api/moods', {
      method: 'POST',
      body: JSON.stringify({ mood: selectedMood, note }),
    });

    setSelectedMood(null);
    setNote('');
    fetchMoods();
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Mood Journal</span>
        <h2>How are you arriving today?</h2>
        <p>Choose a mood and leave a short note. No pressure to explain everything.</p>
      </section>

      <section className="panel">
        <div className="mood-grid">
          {moods.map(([value, label]) => (
            <button
              key={value}
              className={`mood-card ${selectedMood === Number(value) ? 'selected' : ''}`}
              onClick={() => setSelectedMood(Number(value))}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="4"
        />

        <button className="primary-btn" onClick={saveMood} disabled={!selectedMood}>
          Save Mood
        </button>
      </section>

      <section className="panel">
        <h3>Past Entries</h3>

        {loading && <p className="muted">Loading...</p>}
        {!loading && entries.length === 0 && <p className="muted">No mood entries yet.</p>}

        <div className="list-stack">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-row">
              <strong>{moods[entry.mood - 1]?.[1] || 'Mood'}</strong>
              <p>{entry.note || 'No note'}</p>
              <small>{entry.created_at}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}