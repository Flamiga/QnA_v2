import React from 'react';
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
      <ul key={questions._id}>
        {questionList}
      </ul>
        <AddQuestion path="/" addQuestion={props.addQuestion}></AddQuestion>
    </>);
}
export default QuestionList;