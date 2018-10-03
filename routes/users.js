const express = require('express');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('_id fName sName email');
  return res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User(req.body);
  const salt = await bcrypt.genSalt(13);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select('-password -__v');
  if (!user) return res.status(404).send('Invalid user id');
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });
    return res.send(user);
  } catch (ex) {
    return res.send(ex.message);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndRemove({ _id: id }).select('-password');
  if (!user) return res.status(404).send('invalid user id');
  return res.send(user);
});

module.exports = router;
