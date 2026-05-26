import { useState } from 'react';
import { apiRequest } from '../services/api.js';

export default function AuthScreen({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = authMode === 'register';

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? '/api/register' : '/api/login';
    const body = isRegister ? { username, email, password } : { username, password };

    try {
      const data = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      onAuthSuccess(
        {
          userId: data.userId,
          username: data.username,
          email: data.email,
        },
        data.token
      );
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="brand-mark">unwind</div>

        <div className="auth-hero-copy">
          <span className="eyebrow">Self-care workspace</span>
          <h1>{isRegister ? 'Build a softer daily rhythm.' : 'Your calm corner is ready.'}</h1>
          <p>
            Track small rituals, journal your moods, breathe through pressure, and return to yourself one step at a time.
          </p>
        </div>

        <div className="auth-stat-row">
          <div>
            <strong>2 min</strong>
            <span>breathing reset</span>
          </div>
          <div>
            <strong>Daily</strong>
            <span>care plan</span>
          </div>
          <div>
            <strong>Mood</strong>
            <span>journal</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <form className="auth-card" onSubmit={handleAuth}>
          <div>
            <div className="mobile-brand">unwind</div>
            <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isRegister ? 'Start your self-care space.' : 'Continue your wellness journey.'}</p>
          </div>

          {error && <div className="notice error">{error}</div>}

          <label>
            Username
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          {isRegister && (
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}

          <label>
            Password
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>

          <div className="auth-switch">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setAuthMode(isRegister ? 'login' : 'register');
                setError('');
              }}
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}