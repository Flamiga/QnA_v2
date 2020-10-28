import React from 'react';
import {Router} from "@reach/router";
import { Link } from "@reach/router";
import AddQuestion from './AddQuestion';

function QuestionList(props) {
  let questions = props.questions;

  let mapFunction = element =>
    <Link to={`/QnA/${element._id}`} key={element._id}>
      <li>{element.title}</li>  
    </Link>;

  let questionList = questions.map(mapFunction);

  return (
    <>
      <h2>Questions</h2>
      <ul>
        {questionList}
      </ul>
      <Router>
        <AddQuestion path="/" addQuestion={props.addQuestion}></AddQuestion>
      </Router>
    </>);
}
export default QuestionList;