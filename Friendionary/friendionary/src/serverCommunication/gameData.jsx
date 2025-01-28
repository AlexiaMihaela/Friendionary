const API_URL = 'http://localhost:5000/api/gameData';

export async function fetchWords() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch words');
  }
  return response.json();
}

export async function addWord({ _name, _description, _groupID }) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: _name,
        description: _description,
        groupId: _groupID,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add word');
    }
    return response.json();
  }
  

export async function editWord(id, name,newDescription) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name,newDescription }),
  });

  if (!response.ok) {
    throw new Error('Failed to update word');
  }
  return response.json();
}

export async function deleteWord(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete word');
  }
}
