const express = require('express');
const { User } = require('../modules/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('_id fName sName email');
  return res.send(users);
});

module.exports = router;
