import React, {useState, useEffect} from 'react';
import axios from 'axios';

function City() {  
    useEffect(() => {
        axios.get('http://localhost:8000/state', {
    })
    .then(function (response) {
      setStateData(response.data);
    })
    .catch(function (response) {
      console.log(response);
    })
        return () => {
        }
    }, []) 
    const [formValues, setFormValues] = useState({
        city: '',
        stateId:''
    });
    const [stateData,setStateData] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/city', {
            city: formValues.city,
            stateId:formValues.stateId
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
        setFormValues({...formValues, [name]:value});
    }

    return (
        <form id="form" onSubmit={submitHandler}>
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={formValues.city} onChange={handleChange}/>
            <label htmlFor="stateId">State</label>
            <select onChange={handleChange} name="stateId" value= {formValues.stateId}>
              <option value="">Select State</option>
              {
                stateData.map((e) => {
                return <option key={e._id} value={e._id}>{e.name}</option>;
              })}
            </select>     
            <input type="submit" value="submit" />
        </form>
    )
}

export default City
