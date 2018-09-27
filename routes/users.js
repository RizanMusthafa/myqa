const express = require('express');
const { User, validateUser } = require('../modules/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('_id fName sName email');
  return res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
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

module.exports = router;
