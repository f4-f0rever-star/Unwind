import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api.js';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/tasks');
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    await apiRequest('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: newTask }),
    });

    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (id, done) => {
    await apiRequest(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ done: !done }),
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await apiRequest(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Daily Plan</span>
        <h2>Build a care plan you can keep.</h2>
        <p>Add small tasks like drink water, stretch, journal, tidy your space, or take a walk.</p>
      </section>

      <section className="panel">
        <div className="input-row">
          <input
            type="text"
            placeholder="Add a self-care task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button className="primary-btn" onClick={addTask}>
            Add Task
          </button>
        </div>
      </section>

      <section className="panel">
        <h3>Your Tasks</h3>

        {loading && <p className="muted">Loading...</p>}
        {!loading && tasks.length === 0 && <p className="muted">No tasks yet. Add one above.</p>}

        <div className="list-stack">
          {tasks.map((task) => (
            <div key={task.id} className={`task-row ${task.done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id, task.done)}
              />
              <span>{task.title}</span>
              <button className="danger-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}