import React, { Component } from 'react';
import './scores.css';

class Scores extends Component {
  constructor() {
    super();
    this.state = {
      scores : []
    }
  }

  componentDidMount() {
    fetch('/api/scores')
    .then(res => res.json())
    .then(scores => this.setState({scores}, () => console.log('Scores fetched: ',
          scores)));
  }

  render() {
    return (
      <div>
        <h1>Scores</h1>
        <ul>
          {this.state.scores.map(score => (
          <li key={score.id}><h5>{score.time}, {score.name}, {score.score}</h5></li>
        ))}
        </ul>
      </div>
    );

  }
}

export default Scores;
