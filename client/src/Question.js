import React from 'react';
import AddAnswer from './AddAnswer';
import {Link} from '@reach/router';
//import AddVotes from './AddVotes';


function Question(props) {
    const { id, getQuestion } = props;
    const question = getQuestion(id);

    //  let answerList = question; 

    let content = <p>loading...</p>;
    if (question) {

        content = 
        <>
<Link to="/">Back</Link>
            <h2>{question.title}</h2>
            <p>Description: {question.description}</p>

            <h2>Answers</h2>
            <ul>
                {question.answers.map((a, index) => <li key={index}>{a.description}</li>)}
            </ul>

            <AddAnswer question={question} addAnswer={props.addAnswer}></AddAnswer>
        </>
    }
        return (
            <>
                <div>{content}</div>
            </>
        );

    };

    export default Question;