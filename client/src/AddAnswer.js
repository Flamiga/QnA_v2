import React, { useState } from 'react';

function AddAnswer(props) {
    //state const for hver properties i din object(answer)
      const [answer, setAnswer] = useState("");
      const [text, setText] = useState("");
      const [questionId, setquestionId] = useState("");
  
      
      
    return (
        <>

            <input type="text" placeholder="Write an answer..." size="30" onChange={(event) => {
                setAnswer(event.target.value)
            }} />
            <button onClick={(event) => props.addAnswer(answer)}>Add an answer</button>

        </>
    );

}

export default AddAnswer;