import React from 'react'; 
import { Link } from "@reach/router"

function Question(props){
const question = props.getQuestion(props.id); 
/*let list = question.answers.map(answer =>
    <li key={answer}>{answer}</li>);*/
return(
    <>
    <Link to="/">Home</Link>
    <h2>{question.title}</h2>
    <p>Description:{question.description}</p>
    
    </>

)};

export default Question;