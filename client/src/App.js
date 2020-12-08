import React,{ useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import { Router } from "@reach/router";
import Question from './Question';
import AuthService from "./AuthService";
import Login from './Login';

const API_URL = process.env.REACT_APP_API;

const authService = new AuthService(`${API_URL}/users/authenticate`);


function App() {
  const [question, setQuestions] = useState([]);
  const [postCount, setPostCount] = useState(0);
  // const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/QnA`;
      console.log("url", url);
      const response = await authService.fetch(url);
      const data = await response.json();
      setQuestions(data);
      console.log("question", question);
    }
   /* if (!authService.loggedIn()) {
      login("frans", "hest");
    }*/
    fetchData();
  }, [postCount]); // Fetch hver gang den post'er fx answer and question
  //token being saved in the authservice

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log("Authentication:", resp.msg);
      setPostCount(postCount + 1);
    } catch (e) {
      console.log("Login", e);
    }
  }


  function getQuestion(id) {
    const questionObject = question.find(data => data._id === id);
    return questionObject;
  }


  //callback så min addQuestion ved hvor den skal hente data fra
  async function addQuestion(title, description) {
    console.log("title", title);
    console.log("Description" , description);

    const newQuestion = {
      title: title,
      description: description,
    }   

    const url = `${API_URL}/QnA`;
    const response = await authService.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    });
    const data = await response.json();
    //setQuestion([...question, newQuestion]);
    setPostCount(postCount + 1); //call my post count that fecths my data automatic 
    console.log("Question", data);
  }

  //callback så min addAnswer ved hvor den skal hente data fra
  async function addAnswer(text, questionId) {
    console.log(text, questionId)

    const url = `${API_URL}/QnA/${questionId}/answers`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });
    const data = await response.json();
    setPostCount(postCount + 1);
    console.log("answer", data);
  }

  //callbackfunction så min addVote ved hvor den skal hente data fra
  /*async function addVote(vote, questionId, answerId) {
    console.log(questionId, answerId);
    const url = `${API_URL}/QnA/${questionId}/answers/${answerId}/votes`;
    const response = await authService.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote: vote })
    });
    const data = await response.json();
    setPostCount(postCount + 1);
    console.log("votes", data);

  }
*/

  return (
    <>
      <h1>Q n' A App!</h1>
      <Login login={(username, password) => login(username, password)}></Login>
      {authService.loggedIn() ? <pre>User is logged in</pre> : <pre>User is not logged in</pre>}

      <Router>
        <QuestionList path="/" questions={question} addQuestion={addQuestion} >{question._id}</QuestionList>
        <Question path="/QnA/:id" getQuestion={getQuestion} addAnswer={addAnswer} /*addVote={addVote}*/></Question>
      </Router>

    </>
  );
}

export default App;
