import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api.js';

const typeLabels = {
  breathe: 'Breathe',
  water: 'Drink Water',
  journal: 'Journal',
  stretch: 'Stretch',
  gratitude: 'Gratitude',
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [newType, setNewType] = useState('breathe');
  const [newTime, setNewTime] = useState('08:00');
  const [newFrequency, setNewFrequency] = useState('daily');
  const [loading, setLoading] = useState(true);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/reminders');
      setReminders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const addReminder = async () => {
    await apiRequest('/api/reminders', {
      method: 'POST',
      body: JSON.stringify({
        type: newType,
        time: newTime,
        frequency: newFrequency,
        active: true,
      }),
    });

    fetchReminders();
  };

  const toggleReminder = async (id, active) => {
    await apiRequest(`/api/reminders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !active }),
    });

    fetchReminders();
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Reminders</span>
        <h2>Let care find you again.</h2>
        <p>Create gentle prompts for habits you want to return to.</p>
      </section>

      <section className="panel reminder-form">
        <select value={newType} onChange={(e) => setNewType(e.target.value)}>
          <option value="breathe">Breathe</option>
          <option value="water">Drink Water</option>
          <option value="journal">Journal</option>
          <option value="stretch">Stretch</option>
          <option value="gratitude">Gratitude</option>
        </select>

        <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />

        <select value={newFrequency} onChange={(e) => setNewFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <button className="primary-btn" onClick={addReminder}>
          Add Reminder
        </button>
      </section>

      <section className="panel">
        <h3>Your Reminders</h3>

        {loading && <p className="muted">Loading...</p>}
        {!loading && reminders.length === 0 && <p className="muted">No reminders yet.</p>}

        <div className="list-stack">
          {reminders.map((reminder) => (
            <div key={reminder.id} className={`reminder-row ${reminder.active ? '' : 'inactive'}`}>
              <div>
                <strong>{typeLabels[reminder.type] || reminder.type}</strong>
                <small>{reminder.time} · {reminder.frequency}</small>
              </div>

              <button
                className="soft-btn"
                onClick={() => toggleReminder(reminder.id, reminder.active)}
              >
                {reminder.active ? 'Pause' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}