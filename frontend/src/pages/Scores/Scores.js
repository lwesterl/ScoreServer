import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Graph from '../../components/Graph';
import BarChart from '../../components/BarChart';
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


  /**
    *   Constructor
    *   Initializes state
    */
  constructor() {
    super();
    this.state = {
      all_scores : [],
      scores : [],
      levels : [],
      level : '',
      needsRedirect : false,
      scoresReady : false,
      allScoresReady : false,
      levelsReady : false
    }
    this.MaxPlotLen = 100;
    this.MinScoresPlotted = 1;
  }

  /**
    *   Prepare for component mounting
    */
  componentWillMount() {
    this.getUser();
    this.getLevels();
  }

  /**
    *   Component has mounted, start fetching scores
    */
  componentDidMount() {
    this._isMounted = true;
    this.updateAllScores();
    this.updateLevelScores();
    // automatically refresh scores
    this.updateInterval = setInterval(() => {
      this.updateAllScores();
      this.updateLevelScores();
    }, 2000);
  }

  /**
    *   Component has unmounted, update _isMounted
    */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
    *   Check whether this user exists
    *   If user won't exist, change state to indicate need for redirect
    *   Note: this only needs to be called when component is starting to mount
    */
  getUser() {
      fetch(`/api/users/user/${this.props.match.params.name}`)
      .then(res => res.json())
      .then(user => {
        if ((user.length === 0) && (this._isMounted)) {
          this.setState( {needsRedirect : true});
        }
      });
    }

    /**
      *   Get all levels for levels navigation bar
      *   After levelsReady, use getLevelsNav to create correct format for the nav
      *   Note: this only needs to be called when component is starting to mount
      */
    getLevels() {
      fetch('/api/levels')
      .then(res => res.json())
      .then(levels => {
        if (this._isMounted) {
          this.setState( {levels: levels}, () => {
            console.log('levels fetched: ', levels);
            if (levels.length) this.setState( {level : levels[0].name});
            this.setState( {levelsReady: true});
          });
        }
      });
    }


  /**
    *   Get all level specific scores and update state on level
    *   This is intended to be called via level navbar
    */
  getLevelScores(level) {
    if (this._isMounted) this.setState({level : level});
    fetch(`/api/scores/specific_scores?name=${this.props.match.params.name}&level=${level}`)
    .then(res => res.json())
    .then(scores => this.setState( {scores: scores}, () => {
      if (this._isMounted) {
        console.log('Scores fetched: ', scores);
      }
    }));
  }

  /**
    *   Get all scores for the user
    *   After fetching all scores, call getScoreStats to compute stats
    *   This is intended to be called periodically
    */
  updateAllScores() {
    if (this._isMounted) {
      fetch(`/api/scores/specific_scores?name=${this.props.match.params.name}&level=get_all_levels`)
      .then(res => res.json())
      .then(all_scores => this.setState( {all_scores : all_scores}, () => {
        if (this._isMounted) this.setState( {allScoresReady : true});
      }));
    }
  }

  /**
    *   Get all level specific scores
    *   This is intended to be called periodically
    */
  updateLevelScores() {
    if (this.state.levelsReady) {
      fetch(`/api/scores/specific_scores?name=${this.props.match.params.name}&level=${this.state.level}`)
      .then(res => res.json())
      .then(scores => this.setState({scores: scores}, () => {
        if (this._isMounted) {
          console.log('Scores fetched: ', scores);
          this.setState( {scoresReady : true});
        }
      }));
    }
  }

  /**
    *   Convert scores to plottable format
    *   return: scores in the format where those can be fed to Graph
    */
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

  /**
    *   Compute stats from all_scores
    *   return: a json containing the stats
    */
  getScoreStats() {
    var fails = 0;
    var successes = 0;
    var ratio = 100;
    for (var i = 0; i < this.state.all_scores.length; i++) {
      if (this.state.all_scores[i].completed) successes++;
      else fails++;
    }
    if (fails + successes !== 0) ratio = 100 * successes / (successes + fails);
    return { 'fails' : fails, 'completed' : successes, 'ratio' : ratio };
  }

  /**
    *   Convert state.levels to format in which those can be passed to NavBar
    *   return: a list of jsons which contain attributes NavBar needs
    */
  getLevelsNav() {
    var levelNav = [];
    this.state.levels.forEach(entry => {
      levelNav.push( {'href' : 'javascript:void(0)', 'name' : entry.name, 'onClick' : () => this.getLevelScores(entry.name)});
    });
    return levelNav;
  }

  /**
    *   Render the whole score page
    */
  render() {
    if (this.state.needsRedirect) {
      return <Redirect to='/scores' />
    } else {
      var plottable_scores = this.getPlottableScores();
      var stats = this.getScoreStats();
      var levelsNav = this.getLevelsNav();
    }
    console.log('plottable_scores: ', plottable_scores);
    if ((this.state.scoresReady) && (this.state.allScoresReady) && (this.state.levelsReady)) {
      if (plottable_scores.length > this.MinScoresPlotted) {
        return (
          <div>
            <h1>{this.props.match.params.name} scores</h1>
            <p>Completed: {stats.completed}<br/>Fails: {stats.fails}<br/>Success-%: {stats.ratio}</p>
            <BarChart data={[{'x' : 'Wins', 'y' : stats.completed}, {'x' : 'Losses', 'y' : stats.fails}]} labels={['Wins', 'Fails']} title='Career stats' />
            <NavBar items={levelsNav}/>
            <Graph data={plottable_scores}  domain={{ 'x': [1, plottable_scores.length], 'y' : [0, 300]}} title={`Score history: ${this.state.level}`}/>
          </div>
        );
      } else {
        return (
          <div>
            <h1>{this.props.match.params.name} scores</h1>
            <p>Completed: {stats.completed}<br/>Fails: {stats.fails}<br/>Success-%: {stats.ratio}</p>
            <BarChart data={[{'x' : 'Wins', 'y' : stats.completed}, {'x' : 'Losses', 'y' : stats.fails}]} labels={['Wins', 'Fails']} title='Career stats' />
            <NavBar items={levelsNav}/>
            <p>Not enough scores to plot history for {this.state.level}
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
