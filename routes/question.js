const express = require('express');
const { Question, validateQuestion } = require('../models/questions');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().select('title');
    res.send(questions);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.post('/', async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const question = new Question({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    author: '5bae1607e0ae1b0e9f84c261'
  });
  try {
    await question.save();
    return res.status(201).send(question);
  } catch (ex) {
    res.status(500).send(`Unchought server error ${ex.message}`);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });

    if (!question) {
      res.status(404);
      throw new Error('Can not found the question');
    }

    return res.send(question);
  } catch (ex) {
    return res.send(ex.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id)
      .populate('author', '-password -email')
      .populate('answers');

    if (!question) {
      res.status(404);
      throw new Error('Can not found the question');
    }

    res.send(question);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOneAndDelete({ _id: id });

    if (!question) {
      res.status(404);
      throw new Error('Can not found the question');
    }
    res.send(question);
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
