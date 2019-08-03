import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Graph from '../../components/Graph';
import Waiting from '../../components/Waiting';
import './Scores.css';

/**
  *   @class Scores
  *   Implements score visualization using Graph
  *   Note: this class is used for displaying user specific scores. To show
  *   the score main page, use ScoresHome class instead
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
    this.MaxPlotLen = 100;
    this.MinScoresPlotted = 5;
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
    fetch(`/api/scores/specific_scores?name=${this.props.match.params.name}&level=get_all_levels`)
    .then(res => res.json())
    .then(scores => this.setState({scores}, () => {
      if (this._isMounted) {
        console.log('Scores fetched: ', scores);
        this.setState( {scoresReady : true});
      }
    }));
  }

  getPlottableScores() {
    var plottable_scores = [];
    for (var i = 0; i < this.state.scores.length; i++) {
        plottable_scores.push({'x' : i + 1, 'y' : this.state.scores[i].score});
    }
    if (plottable_scores.length > this.MaxPlotLen) {
      plottable_scores = plottable_scores.slice(-this.MaxPlotLen, );
    }
    return plottable_scores;
  }

  getScoreStats() {
    var fails = 0;
    var successes = 0;
    var ratio = 100;
    for (var i = 0; i < this.state.scores.length; i++) {
      if (this.state.scores[i].completed) successes++;
      else fails++;
    }
    if (fails + successes !== 0) ratio = 100 * successes / (successes + fails);
    return { 'fails' : fails, 'completed' : successes, 'ratio' : ratio };
  }


  render() {
    if (this.state.needsRedirect) {
      return <Redirect to='/scores' />
    } else {
      var plottable_scores = this.getPlottableScores();
      var stats = this.getScoreStats();
    }
    console.log('plottable_scores: ', plottable_scores);
    if (this.state.scoresReady) {
      if (plottable_scores.length > this.MinScoresPlotted) {
        return (
          <div>
            <h1>{this.props.match.params.name} scores</h1>
            <p>Completed: {stats.completed}<br/>Fails: {stats.fails}<br/>Success-%: {stats.ratio}</p>
            <Graph data={plottable_scores}  domain={{ 'x': [1, plottable_scores.length], 'y' : [0, 300]}} title='History'/>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Scores</h1>
            <p>Not enough scores to plot history
            <br/>Play more first!</p>
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
