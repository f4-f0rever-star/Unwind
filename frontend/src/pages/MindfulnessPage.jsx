import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api.js';

export default function MindfulnessPage() {
  const [breathingState, setBreathingState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');

  const startBreathing = () => {
    setMessage('');
    setIsActive(true);
    setBreathingState('inhale');
    setTimeLeft(4);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setBreathingState('ready');
    setTimeLeft(4);
  };

  useEffect(() => {
    if (!isActive || breathingState === 'ready') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (breathingState === 'inhale') {
            setBreathingState('hold');
            return 4;
          }

          if (breathingState === 'hold') {
            setBreathingState('exhale');
            return 6;
          }

          setBreathingState('inhale');
          return 4;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, breathingState]);

  const logSession = async () => {
    await apiRequest('/api/mindfulness-sessions', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    setMessage('Session logged. Beautiful work.');
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Mindfulness</span>
        <h2>Slow your system down.</h2>
        <p>Use the 4-4-6 rhythm: inhale for 4, hold for 4, exhale for 6.</p>
      </section>

      <section className="breathing-panel">
        <div className={`breathe-circle ${breathingState}`}>
          {breathingState === 'ready' && 'Start'}
          {breathingState !== 'ready' && (
            <>
              <span>{breathingState}</span>
              <strong>{timeLeft}</strong>
            </>
          )}
        </div>

        <div className="button-row">
          {!isActive ? (
            <button className="primary-btn" onClick={startBreathing}>
              Start Breathing
            </button>
          ) : (
            <button className="danger-btn large" onClick={stopBreathing}>
              Stop
            </button>
          )}

          <button className="soft-btn" onClick={logSession}>
            Log Session
          </button>
        </div>

        {message && <div className="notice success">{message}</div>}
      </section>

      <section className="panel">
        <h3>Relaxing Sound Space</h3>
        <p className="muted">
          Add real rain, ocean, or forest audio files later for a more polished experience.
        </p>
      </section>
    </div>
  );
}