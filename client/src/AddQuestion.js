import React, { useState } from 'react';

function AddQuestion(props) {
    //state const for hver properties i din object(question)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  


    return (
        <><label>Title: </label>
            <input type="text" placeholder="Write the title of your question" size="30" onChange={(event) => {
                setTitle(event.target.value)
            }
            } /><br /><label>Description: </label>
            <input type="text" placeholder="Write the description..." size="30" onChange={(event) => {
                setDescription(event.target.value)
            }} />
            <br />
            <button onClick={(event) => props.addQuestion(title, description)}>Add Question</button>
  

        </>
    );

}

export default AddQuestion;