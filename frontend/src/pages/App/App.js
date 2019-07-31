import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Home from '../Home/Home';
import Scores from '../Scores/Scores';
import About from '../About/About';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/scores'>Scores</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
        <hr/>

        <Route exact path='/' component={Home}/>
        <Route path='/Scores' component={Scores} />
        <Route path='/About' component={About} />
      </div>
    </Router>
  );
}

export default App;
