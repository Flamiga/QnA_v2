import React, { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion';
import QuestionList from './QuestionList';
import { Router } from "@reach/router";
import Question from './Question';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [question, setQuestion] = useState([
    { title: 'Help', description: 'I feel it is very difficult to code', answers: ['you can do it', 'i believe in you', 0] },
    { title: 'Android', description: 'what can i do to learn android?', answers: ['understand kotlin', 'understand fragment', 1] },
    { title: 'What involves in Umbraco?', description: 'As my title say what does it take to use umbraco?', answers: ['Use C# and MVC controller', 3] }
  ]);

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/QnA`;
      console.log("url", url);
      const response = await fetch(url);
      const data = await response.json();
      setQuestion(data);
      console.log("question", question);
    }
    getData();
  }, []);

  function getQuestion(id) {
    const questionObject = question.find(data => data._id === id);
    return questionObject;
  }


  //callback så min addQuestion ved hvor den skal hente data fra
  function addQuestion(title, description) {
    const newQuestion = {
      title: title,
      description: description,
    };
    setQuestion([...question, newQuestion])
  }

  function addAnswer(text) {
    const newAnswer = {
      text: text
    };
    setQuestion([...question, newAnswer])
  }

  return (
    <>
      <h1>Q n' A App!</h1>

      <Router>
        <QuestionList path="/" questions={question}>{question._id}</QuestionList>
        <Question path="/QnA/:id" getQuestion={getQuestion}></Question>
      </Router>

      <Router>
        <AddQuestion path="/" addQuestion={addQuestion}></AddQuestion>

      </Router>
    </>
  );
};

export default App;
