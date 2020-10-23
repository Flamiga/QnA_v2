module.exports = (mongoose) => {
  
    const QnASchema = new mongoose.Schema({
      title: String,
      description: String, 
      answers: [{ text: String, votes: Number
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
      try {
        return await QnAModel.findById(id);
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }

    async function createQuestion(text) {
      let question = new QnAModel({ title: "test", description: "test", answers: [answer, answer] });
      return question.save();
    }

    async function bootstrap(count = 10) {
      let l = (await getQuestions()).length;
      console.log("Question collection size:", l);

      if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
          let newQuestion = new QnAModel({ title: `Question number ${i}`, description:`Description ${i}`,  answers:[{text: `Answer ${i}`, votes: i}]
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
      bootstrap
    }
  }
