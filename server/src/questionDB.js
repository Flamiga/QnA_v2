module.exports = (mongoose) => {

  const QnASchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{
      text: String, vote: Number
    }]
  });

  const QnAModel = mongoose.model('QnA', QnASchema);

  async function getQuestions() {
    try {
      return await QnAModel.find();
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async function getQuestion(id) {
    console.log("getquestion id", id);
    try {
      return await QnAModel.findById(id);
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async function getAnswer(id) {
    try {
      return await QnAModel.findById(id);
    } catch (error) {
      console.log("getAnswer: ", error.message);
      return {};
    }
  }

  async function createQuestion(title, description) {
    const question = new QnAModel( { title: title, description: description, answers: [] });
    console.log(question);

    //adding the qustion
    return question.save();
  }

  async function createAnswer(answer, questionId) {
    //finder question
    const question = await getQuestion(questionId);
    //lav svaret
    let newAnswer = { text: answer, vote: 0 }
    //indsætter answer i array
    question.answers.push(newAnswer)
    //save quesiton igen
    return question.save();
  }

  async function voteAnswer(questionId, answerId) {
    const answer = await getAnswer(questionId, answerId);
    answer.vote += 1;
    return answer.save();
  }

  async function bootstrap(count = 10) {
    let l = (await getQuestions()).length;
    console.log("Question collection size:", l);

    if (l === 0) {
      let promises = [];
      for (let i = 0; i < count; i++) {
        let newQuestion = new QnAModel({
          title: `Question number ${i}`, description: `Description ${i}`, answers: [{ text: `Answer ${i}`, votes: i }]
        });
        promises.push(newQuestion.save());
      }
      return Promise.all(promises);
    }
  }

  return {
    getQuestions,
    getQuestion,
    createQuestion,
    getAnswer,
    createAnswer,
    voteAnswer,
    bootstrap
  }
}
