import React, {useState} from 'react';
import axios from 'axios';

function State() {
    const [state,setState] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/state', {
            name:state
        })
        .then(function (response) {
        console.log(response);
        })
        .catch(function (response) {
        console.log(response);
        })   
    };

    const handleChange= (event) => {
        const {name, value} = event.target;
        setState(value);
    }
    return (
        <form id="form" onSubmit={submitHandler}>
        <label htmlFor="state">State</label>
        <input type="text" name="state" value={state} onChange={handleChange}/>
        <input type="submit" value="submit" />
    </form>
    )
}

export default State
