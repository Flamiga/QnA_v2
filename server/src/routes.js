const questionDB = require("./questionDB");

module.exports = (mongoose) => {


  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const question = await questionDB.getQuestions(); 
    res.json(question);
  });

  router.get('/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router.post('/', async (req, res) => {
    // TODO: Implement!
    const question = await questionDB.createQuestion();
    res.json({msg: "Not implemented :("});
  });

  return router;
}
