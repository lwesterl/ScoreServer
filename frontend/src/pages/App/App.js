import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Home from '../Home/Home';
import ScoresHome from '../ScoresHome/ScoresHome';
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

        <Route exact path='/' component={Home} />
        <Route exact path='/Scores' component={ScoresHome} />
        <Route exact path='/Scores/:name' component={Scores} />
        <Route exact path='/About' component={About} />
      </div>
    </Router>
  );
}

export default App;
