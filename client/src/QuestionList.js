import React from 'react';
import {Link} from "@reach/router";

function QuestionList(props){
let questions = props.questions;

let mapFunction = element =>
<Link to={`/QnA/${element.title}`} key={element.title}>
  <li>{element.title}</li>
</Link>;

 let questionList = questions.map(mapFunction);

 return (
 <>
 <h2>Questions</h2>
 <ul>
{questionList}
 </ul>
</>);
}
export default QuestionList;