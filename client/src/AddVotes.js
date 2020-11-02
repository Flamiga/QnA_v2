import React, { useState } from 'react';
function AddVotes(props) {
    //state const for hver properties i din object(answer)
    const [vote, setVotes] = useState(0);
    //const [questionId, setQuestionId] = useState("");



    return (
        <>
            <label type="number" onChange={(event) =>
                setVotes(event.target.value
                )}></label>
            <button onClick={(event) => props.addVote(vote)}>0</button>

        </>
    );

}

export default AddVotes;