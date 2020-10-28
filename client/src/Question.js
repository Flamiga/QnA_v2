import React from 'react';
import { Link, Router } from "@reach/router"
import AddAnswer from './AddAnswer';


function Question(props) {
    const id = props.id
    const question = props.getQuestion(id);

    return (
        <>
            <Link to="/">Home</Link>
            <h2>{question.title}</h2>
            <p>Description: {question.description}</p>
            <h3>Add an answer</h3>
            <Router>
                <AddAnswer path="/" addAnswer={props.addAnswer}></AddAnswer>
            </Router>
        </>


    );

};

export default Question; 