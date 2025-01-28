const pool=require( '../DatabaseAuth.js');
const GameData =require('../models/GameData.js');

exports.getAllGameData=async(req, res)=>{
  try {
    const result = await pool.query('SELECT id, "user", description, "groupId" FROM "gameData";');
    const gameDataList = result.rows.map((row) => GameData.fromDatabaseRow(row));
    res.json(gameDataList);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addGameData=async(req, res)=> {
  const { name, description, groupId } = req.body;

  if (!name || !description || !groupId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "gameData" ("user", description, "groupId") VALUES ($1, $2, $3) RETURNING *;',
      [name, description, groupId]
    );

    const newGameData = GameData.fromDatabaseRow(result.rows[0]);
    res.status(201).json(newGameData);
  } catch (error) {
    console.error('Error adding game data:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateGameData= async(req, res) =>{
  const { id } = req.params;
  const { name, newDescription } = req.body;
  if (!id || !name || !newDescription ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await pool.query(
      'UPDATE "gameData" SET "user" = $1, description = $2 WHERE id = $3 RETURNING *;',
      [name, newDescription, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    const updatedGameData = GameData.fromDatabaseRow(result.rows[0]);
    res.json(updatedGameData);
  } catch (error) {
    console.error('Error updating game data:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteGameData=async (req, res)=> {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID is required.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM "gameData" WHERE id = $1 RETURNING *;',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    res.json({ message: 'Record deleted successfully.', record: GameData.fromDatabaseRow(result.rows[0]) });
  } catch (error) {
    console.error('Error deleting game data:', error);
    res.status(500).send('Internal Server Error');
  }
};
