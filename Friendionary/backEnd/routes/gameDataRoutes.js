const express = require('express');
const{ getAllGameData, addGameData,updateGameData,deleteGameData } =require('../controller/gameDataController.js');
const router = express.Router();

router.get('/', getAllGameData); 
router.post('/', addGameData); 
router.put('/:id', updateGameData); 
router.delete('/:id', deleteGameData);

module.exports= router;

