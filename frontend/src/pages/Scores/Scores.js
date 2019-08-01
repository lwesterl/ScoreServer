import React, { Component } from 'react';
import Graph from '../../components/Graph'
import './Scores.css';

/**
  *   @class Scores
  *   Implements score visualization using Graph
  */
class Scores extends Component {
  constructor() {
    super();
    this.state = {
      scores : []
    }
  }

  componentDidMount() {
    /** TODO: Scores should be returned newer first */
    this.updateScores();
    // automatically refresh scores
    this.updateInterval = setInterval(() => {
      this.updateScores();
    }, 2000)
  }

  updateScores() {
    fetch('/api/scores')
    .then(res => res.json())
    .then(scores => this.setState({scores}, () => console.log('Scores fetched: ',
    scores)));
  }

  render() {
    var plottable_scores = [];
    const MaxPlotLen = 100;
    const MinScoresPlotted = 5;
    for (var i = 0; i < this.state.scores.length; i++) {
      if (i < MaxPlotLen) {
          plottable_scores.push({'x' : i + 1, 'y' : this.state.scores[i].score});
      }

    }
    //console.log('plottable_scores: ', plottable_scores);
    if (plottable_scores.length > MinScoresPlotted) {
      return (
        <div>
          <h1>Scores</h1>
          <Graph data={plottable_scores}  domain={{ 'x': [1, plottable_scores.length], 'y' : [0, 300]}} title='History'/>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Scores</h1>
          <p>Not enough scores to plot history
          <br/> Play more first!</p>
        </div>
      );
    }
  }
}

export default Scores;
