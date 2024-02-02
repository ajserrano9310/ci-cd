import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

// Components
import SearchBar from './Components/SearchBar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1> ReactJS Weather Apps </h1>
      <div className='container'>
        <div className='row'> 
          <div className="col">
          <SearchBar></SearchBar>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
