export const API_BASE = 'http://localhost:5000';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...(options.headers || {}),
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || 'Request failed');
    }

    return data;
  } catch (err) {
    console.error(err);

    throw new Error(
      'Backend server is unavailable right now.'
    );
  }
}