import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Graph from '../../components/Graph';
import Waiting from '../../components/Waiting';
import './Scores.css';

/**
  *   @class Scores
  *   Implements score visualization using Graph
  */
class Scores extends Component {

  _isMounted = false;

  constructor() {
    super();
    this.state = {
      scores : [],
      needsRedirect : false,
      scoresReady : false
    }
  }

getUser() {
    fetch(`/api/users/user/${this.props.match.params.name}`)
    .then(res => res.json())
    .then(user => {
      if ((user.length === 0) && (this._isMounted)) {
        this.setState( {needsRedirect : true});
      }
    });
  }

  componentWillMount() {
    this.getUser();
  }

  componentDidMount() {
    this._isMounted = true;
    /** TODO: Scores should be returned newer last */
    this.updateScores();
    // automatically refresh scores
    this.updateInterval = setInterval(() => {
      this.updateScores();
    }, 2000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateScores() {
    fetch('/api/scores')
    .then(res => res.json())
    .then(scores => this.setState({scores}, () => {
      console.log('Scores fetched: ', scores);
      this.setState( {scoresReady : true });
    }));
  }


  render() {
    const MaxPlotLen = 100;
    const MinScoresPlotted = 5;

    if (this.state.needsRedirect) {
      return <Redirect to='/' />
    } else {
      var plottable_scores = [];

      for (var i = 0; i < this.state.scores.length; i++) {
          plottable_scores.push({'x' : i + 1, 'y' : this.state.scores[i].score});
      }
      if (plottable_scores.length > MaxPlotLen) {
        plottable_scores = plottable_scores.slice(-MaxPlotLen, );
      }
    }
    //console.log('plottable_scores: ', plottable_scores);
    if (this.state.scoresReady) {
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
    } else {
      return (
        <Waiting />
      );
    }
  }
}

export default Scores;
