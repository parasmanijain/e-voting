import React, {useState} from 'react';
import axios from 'axios';

function Party() {
    const [party,setParty] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/party', {
            name:party
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
        setParty(value);
    }
    return (
        <form id="form" onSubmit={submitHandler}>
        <label htmlFor="party">Party</label>
        <input type="text" name="party" value={party} onChange={handleChange}/>
        <input type="submit" value="submit" />
    </form>
    )
}

export default Party
