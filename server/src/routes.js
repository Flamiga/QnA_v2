//const questionDB = require("./questionDB");

module.exports = (questionDB) => {


  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
  });

  router.get('/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router.post('/:id', async (req, res) => {
    // TODO: Implement!
    const question = await questionDB.getQuestion(req.params.id);

    res.json(question);
  });

  return router;
}
