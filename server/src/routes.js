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

  router.post('/', async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    
    const question = await questionDB.createQuestion(title, description);

    res.json(question);
  });

  /***ANSWERS*** */

  // POST /api/question/answers/:id
  router.post('/:id/answers', async (req, res) => {

    let text = req.body.text;
    let questionId = req.params.id;
    const answer = await questionDB.createAnswer(text, questionId);
    res.json(answer);
  });

  /***VOTES***/
  router.post('/:questionId/answers/:answerId/votes', async (req, res) =>{
    let questionId = req.params.questionId; 
    let answerId = req.params.answerId; 
    const vote = await questionDB.voteAnswer(questionId, answerId); 
    res.json(vote);
  });


  return router;
}
