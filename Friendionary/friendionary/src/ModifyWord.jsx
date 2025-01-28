import React, { useState, useEffect } from 'react';
import './ModifyWord.css';
import { fetchWords, addWord, editWord, deleteWord } from '../src/serverCommunication/gameData.jsx';

function ModifyWord() {
  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState({ _name: '', _description: '', _groupID: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWords = async () => {
      try {
        const words = await fetchWords();
        setWordList(words);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadWords();
  }, []);

  const handleAddWord = async (name, description, groupID) => {
    if (!name || !description || !groupID) {
      alert('All fields are required.');
      return;
    }
  
    try {
      const addedWord = await addWord({ _name: name, _description: description, _groupID: groupID });
      setWordList((prevList) => [...prevList, addedWord]);
      setShowAddForm(false);
      setNewWord({ _name: '', _description: '', _groupID: '' });
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleEdit = async (id, name,newDescription) => {
    try {
      const updatedWord = await editWord(id,name, newDescription);
      setWordList((prevList) =>
        prevList.map((word) => (word.id === id ? { ...word, description: updatedWord.description } : word))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWord(id);
      setWordList((prevList) => prevList.filter((word) => word._id !== id));
      setSelectedWord(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading words...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modify-word-container">
      <h3>Elements</h3>
      <div className="word-list">
        {wordList.map((word) => (
          <div
            key={word._id}
            className={`word-item ${selectedWord?._id === word._id ? 'selected' : ''}`}
            onClick={() => setSelectedWord(word)}
          >
            {word._name}- {word._description}
          </div>
        ))}
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add word
        </button>
      </div>
      <div className="word-details">
        {selectedWord ? (
          <>
            <h1>{selectedWord._name}</h1>
            <p>{selectedWord._description}</p>
            <button
              className="edit-button"
              onClick={() => {
                const newDescription = prompt('Edit description:', selectedWord._description);
                if (newDescription) {
                  handleEdit(selectedWord._id, selectedWord._name, newDescription);
                }
              }}
            >
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(selectedWord._id)}>
              Delete
            </button>
          </>
        ) : (
          <p>Select a word to see details</p>
        )}
      </div>

      {showAddForm && (
       <div className="add-word-form">
       <h3>Add New Word</h3>
       <form
         onSubmit={(e) => {
           e.preventDefault(); 
           handleAddWord(newWord._name, newWord._description, newWord._groupID); 
         }}
       >
         <div>
           <label>User:</label>
           <input
             type="text"
             value={newWord._name || ''}
             onChange={(e) => setNewWord({ ...newWord, _name: e.target.value })}
             required
           />
         </div>
         <div>
           <label>Description:</label>
           <input
             type="text"
             value={newWord._description || ''}
             onChange={(e) => setNewWord({ ...newWord, _description: e.target.value })}
             required
           />
         </div>
         <div>
           <label>Group ID:</label>
           <input
             type="number"
             value={newWord._groupID || ''}
             onChange={(e) => setNewWord({ ...newWord, _groupID: e.target.value })}
             required
           />
         </div>
         <button type="submit" className="save-button">
           Save
         </button>
         <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
           Cancel
         </button>
       </form>
     </div>
     
      )}

      <a href="/start" className="Exit-button">
        Exit
      </a>
    </div>
  );
}

export default ModifyWord;
