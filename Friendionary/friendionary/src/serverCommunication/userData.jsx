const API_BASE_URL = 'http://localhost:5000/api/auth';


export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function authenticateUser(username, password, groupId) {
  const users = await fetchUsers();
  const user = users.find(
    (user) =>
      user._username === username &&
      user._password === password &&
      user._groupId === groupId
  );
  return Boolean(user);
}

export async function registerUser(user) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return response.json();
  }
