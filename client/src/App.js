import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import { Router } from "@reach/router";
import Question from './Question';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [question, setQuestion] = useState([]);

  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/QnA`;
      console.log("url", url);
      const response = await fetch(url);
      const data = await response.json();
      setQuestion(data);
      console.log("question", question);
    }
    fetchData();
  }, []);

  function getQuestion(id) {
    const questionObject = question.find(data => data._id === id);
    return questionObject;
  }


  //callback så min addQuestion ved hvor den skal hente data fra
  async function addQuestion(title, description) {
    console.log(title, description)

    const newQuestion = {
      title: title,
      description: description,
    }
    setQuestion([...question, newQuestion])
    
    const url = `${API_URL}/QnA`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title, description}),
    });
    const data = await response.json();
    console.log("data",data);
  

  }

  //callback så min addQuestion ved hvor den skal hente data fra
  function addAnswer(text, questionId) {
    const newAnswer = {
      text: text,
      questionId: questionId
    }

    setAnswer([...answer, newAnswer])
  }


  return (
    <>
      <h1>Q n' A App!</h1>

      <Router>
        <QuestionList path="/" questions={question} addQuestion={addQuestion} >{question._id}</QuestionList>
        <Question path="/QnA/:id" getQuestion={getQuestion} addAnswer={addAnswer}></Question>
      </Router>

    </>
  );
} 

export default App;
