import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import State from './components/State';
import City from './components/City';
import Home from './components/Home';
import Party from './components/Party';

function App() {
  useEffect(() => {
    populateStateData();
    return () => {
    }
  }, []);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [stateSelected,setStateSelected] = useState('');
  const [city, setCity] = useState('');

  const populateCityData = (selectedState) => {
    axios.get('http://localhost:8000/city', {
      params: {
        stateId: selectedState
      }
    })
    .then(function (response) {
      setCityData(response.data);
    })
    .catch(function (response) {
      console.log(response);
    })
  }

 const populateStateData = () => {
    axios.get('http://localhost:8000/state', {
    })
    .then(function (response) {
      setStateData(response.data);
    })
    .catch(function (response) {
      console.log(response);
    })
  }

  const handleChange = (event) => {
    const {value} = event.target;
    setCity(value);
  }

  const stateChange = (event) => {
    const {value} = event.target;  
    setStateSelected(value);
    if(value) {
      populateCityData(value);
    }
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/state">State</Link>
            </li>
            <li>
              <Link to="/city">City</Link>
            </li>
            <li>
              <Link to="/party">Party</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/state">
            <State />
          </Route>
          <Route path="/city">
            <City />
          </Route>
          <Route path="/party">
            <Party />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    // <div className="App">
    //   <form id="form">
            
    //        {/* <input type="text" name="city" value={formValues.city} onChange={handleChange}/> */}
    //         <label htmlFor="state">State</label>
    //         <select onChange={stateChange} name="state" value= {stateSelected}>
    //           <option value="">Select State</option>
    //           {
    //             stateData.map((e) => {
    //             return <option key={e._id} value={e._id}>{e.name}</option>;
    //           })}
    //         </select>
    //         <label htmlFor="city">City</label>
    //         <select onChange={handleChange} name="city" value= {city}>
    //           <option value="">Select City</option>
    //           {
    //             cityData.map((e) => {
    //             return <option key={e._id} value={e._id}>{e.name}</option>;
    //           })}
    //         </select>                
    //         <input type="submit" value="submit" />
    //     </form>
    // </div>
  );
}

export default App;
