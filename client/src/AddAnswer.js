import React, { useState } from 'react';
function AddAnswer(props) {
    //state const for hver properties i din object(answer)
      const [text, setText] = useState(""); 
      //const [questionId, setQuestionId] = useState("");
  
      
      
    return (
        <>

            <input type="text" placeholder="Write an answer..." size="30" onChange={(event) => {
                setText(event.target.value)
            }} />
            <button onClick={(event) => props.addAnswer(text, props.id)}>Add an answer</button>

        </>
    );

}

export default AddAnswer;