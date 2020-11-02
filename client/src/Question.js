import React from 'react';
import { Link } from "@reach/router"
import AddAnswer from './AddAnswer';
import AddVotes from './AddVotes';


function Question(props) {
    const id = props.id
    const question = props.getQuestion(id);

    let answerList = question.answers.map(answer =>
        <li key={answer._id}>{answer.text} <AddVotes addVote={answer.vote}></AddVotes></li>)

    return (
        <>
            <Link to="/">Home</Link>
            <h2>{question.title}</h2>
            <p>Description: {question.description}</p>
            <h2>Answers</h2>
            <ul>{answerList}</ul>
            <h3>Add an answer</h3>
            <AddAnswer id={question._id} addAnswer={props.addAnswer}></AddAnswer>
 
        </>


    );

};

export default Question; 