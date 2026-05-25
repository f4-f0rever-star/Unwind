import { useEffect, useState } from 'react';
import AuthScreen from './components/AuthScreen.jsx';
import Shell from './components/Shell.jsx';
import HomePage from './pages/HomePage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import MoodsPage from './pages/MoodsPage.jsx';
import MindfulnessPage from './pages/MindfulnessPage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import RemindersPage from './pages/RemindersPage.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (authUser, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authUser));
    setUser(authUser);
    setPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setPage('home');
  };

  if (!user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <Shell user={user} page={page} setPage={setPage} onLogout={handleLogout}>
      {page === 'home' && <HomePage user={user} setPage={setPage} />}
      {page === 'tasks' && <TasksPage />}
      {page === 'moods' && <MoodsPage />}
      {page === 'mindfulness' && <MindfulnessPage />}
      {page === 'articles' && <ArticlesPage />}
      {page === 'reminders' && <RemindersPage />}
    </Shell>
  );
}