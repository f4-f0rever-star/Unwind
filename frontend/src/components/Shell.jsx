const navItems = [
  ['home', 'Home'],
  ['tasks', 'Daily Plan'],
  ['moods', 'Mood Journal'],
  ['mindfulness', 'Mindfulness'],
  ['articles', 'Library'],
  ['reminders', 'Reminders'],
];

export default function Shell({ user, page, setPage, onLogout, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1>unwind</h1>
          <p className="sidebar-subtitle">One small step at a time</p>

          <nav className="nav-links">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                className={page === id ? 'active' : ''}
                onClick={() => setPage(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="mini-profile">
            <div>{user.username?.charAt(0).toUpperCase()}</div>
            <span>{user.username}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content-area">{children}</main>
    </div>
  );
}