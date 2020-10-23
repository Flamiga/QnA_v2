import React from 'react';
import { Link } from "@reach/router"

function Question(props) {
    const id = props.id
    const question = props.getQuestion(id);
    /*let list = question.answers.map(answer =>
        <li key={answer}>{answer}</li>);*/
    return (
        <>
            <Link to="/">Home</Link>
            <h2>{question.title}</h2>
            <p>Description: {question.description}</p>

        </>

    )
};

export default Question;