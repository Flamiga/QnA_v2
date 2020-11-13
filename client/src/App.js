import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import { Router } from "@reach/router";
import Question from './Question';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [question, setQuestion] = useState([]);
  const [postCount, setPostCount] = useState(0);
 // const [answer, setAnswer] = useState([]);

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
  }, [postCount]); // Fetch hver gang den post'er fx answer and question

  function getQuestion(id) {
    const questionObject = question.find(data => data._id === id);
    return questionObject;
  }


  //callback så min addQuestion ved hvor den skal hente data fra
  async function addQuestion(title, description) {
    console.log(title, description);

    const newQuestion = {
      title: title,
      description: description,
    }
    
    const url = `${API_URL}/QnA`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    });
    const data = await response.json();
    //setQuestion([...question, newQuestion]);
    setPostCount(postCount + 1); //call my post count that fecths my data automatic 
    console.log("Question",data);
  }

  //callback så min addAnswer ved hvor den skal hente data fra
  async function addAnswer(text, questionId) {
    console.log(text, questionId)
   
    const url = `${API_URL}/QnA/${questionId}/answers`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({text: text}),
    });
    const data = await response.json();
    setPostCount(postCount + 1);
    console.log("answer",data);
  }

  //callbackfunction så min addVote ved hvor den skal hente data fra
  async function addVote(vote, questionId, answerId){
    console.log(questionId, answerId);
    const url = `${API_URL}/QnA/${questionId}/answers/${answerId}/votes`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({vote:vote})
    });
    const data = await response.json();
    setPostCount(postCount + 1);
    console.log("votes",data);

  }


  return (
    <>
      <h1>Q n' A App!</h1>

      <Router>
        <QuestionList path="/" questions={question} addQuestion={addQuestion} >{question._id}</QuestionList>
        <Question path="/QnA/:id" getQuestion={getQuestion} addAnswer={addAnswer} addVote={addVote}></Question>
      </Router>

    </>
  );
} 

export default App;
