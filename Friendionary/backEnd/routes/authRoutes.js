const express = require('express');
const { getAllUsers, addUser } = require('../controller/authController.js');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', addUser);

module.exports = router;
