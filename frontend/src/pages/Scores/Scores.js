import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Graph from '../../components/Graph';
import BarChart from '../../components/BarChart';
import Loading from '../../components/Loading';
import CustomToggleButtons from '../../components/CustomToggleButtons';
import './Scores.css';

const PlayerImage = require('../../assets/images/Player.png');

/**
  *   @class Scores
  *   Implements score visualization using Graph
  *   Note: this class is used for displaying user specific scores. To show
  *   the score main page, use ScoresHome class instead
  */
class Scores extends Component {

  _isMounted = false;
  CareerStatsOffColor = 'white'; // color used for career stats plot labels
  CareerStatsWinColor = '#209010'; // color used for successes in career stats
  CareerStatsFailColor = 'red'; // color used for fails in career stats
  GraphColor = 'red'; // color used for the level score Graph
  GraphScatterColor = 'white'; // color used for the level score Graph scatter of datapoints
  DistributionOnColor = 'white'; // color used for the score distribution plot on mouse hover
  DistributionOffColor = 'red'; // color used for the score distribution when mouse not hovering on it
  DistributionStandardColor = 'white'; // color used for the most of the datapoints in the score distribution plot
  DistributionSpecialColor = 'red'; // color used for highligting used record in the score distribution plot
  PlotWidth = '50%'; // width for plot containers, divs



  /**
    *   Constructor
    *   Initializes state
    */
  constructor() {
    super();
    this.state = {
      all_user_scores : [],
      scores : [],
      levels : [],
      gameModes : [],
      plottable_scores : [],
      every_score : [],
      level : '',
      needsRedirect : false,
      scoresReady : false,
      allScoresReady : false,
      levelsReady : false,
      gameModesReady : false
    }
    this.MaxPlotLen = 100;
    this.MinScoresPlotted = 1;
    this.currentGameMode = [];
    this.GraphInitialized = false;
  }

  /**
    *   Prepare for component mounting
    */
  componentWillMount() {
    this.getUser();
    this.getLevels();
    this.getGameModes();
    this.fetchEveryScore();
  }

  /**
    *   Component has mounted, start fetching scores
    */
  componentDidMount() {
    this._isMounted = true;
    this.updateAllScores();
    // automatically refresh scores
    this.updateInterval = setInterval(() => {
      this.updateAllScores();
      this.updateLevelScores();
    }, 10000);
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
      })
      .catch((error) => {
        //console.log(error);
        this.setState({needsRedirect : true});
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
            //console.log('levels fetched: ', levels);
            if (levels.length) this.setState( {level : levels[0].name});
            this.setState( {levelsReady: true}, () => this.updateLevelScores());
          });
        }
      });
    }

    /**
      *   Get all GameModes for adjusting the Graph
      *   After GameModes are fetched, updates currentGameMode
      *   Note: this should be only called when component is starting to mount
      */
    getGameModes() {
      fetch('/api/game_modes')
      .then(res => res.json())
      .then(gameModes => {
        if (this._isMounted) {
          let parsed_modes = []
          gameModes.forEach( (mode) => {
            parsed_modes.push({ 'value' : mode.id, 'name' : mode.description });}
          );
          this.setState( {gameModes : parsed_modes} );
          this.setState( {gameModesReady : true} );
          if ((this.state.gameModes.length) && (!this.GraphInitialized)) {
            this.currentGameMode = [this.state.gameModes[0].value];
          }
        }
      });
    }

  /**
    *   Get every score, gameMode and level where the score was played on
    *   Note: this updates state.every_score and should be called only once
    */
    fetchEveryScore() {
      fetch('/api/scores/scores_and_levels')
      .then(res => res.json())
      .then(scores => {
        if (this._isMounted) {
          this.setState( {every_score : scores} );
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
    .then(scores => {
      if (this._isMounted) {
        this.setState( {scores: scores} );
        //console.log('Scores fetched: ', scores);
        this.getPlottableScores(this.currentGameMode);
      }
    });
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
      .then(all_user_scores => {
        if (this._isMounted) {
          this.setState( {all_user_scores : all_user_scores} );
          this.setState( {allScoresReady : true} );
        }
      });
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
      .then(scores => {
        if (this._isMounted) {
          this.setState( {scores: scores} );
          //console.log('Scores fetched: ', scores);
          this.setState( {scoresReady : true});

          // show the first initialGameMode scores in Graph, initialGameMode is set by getGameModes
          if (!this.GraphInitialized) {
            this.getPlottableScores(this.currentGameMode);
            this.GraphInitialized = true;
          }
        }
      });
    }
  }

  /**
    *   Convert scores to plottable format
    *   @return scores in the format where those can be fed to Graph
    */
  getPlottableScores(gameModes) {
    var plottable_scores = [];
    for (var i = 0; i < this.state.scores.length; i++) {
        if (gameModes.includes(this.state.scores[i].gameMode)) {
          plottable_scores.push({'x' : i + 1, 'y' : this.state.scores[i].score});
        }
    }
    if (plottable_scores.length > this.MaxPlotLen) {
      plottable_scores = plottable_scores.slice(-this.MaxPlotLen, );
    }
    if (this._isMounted) {
      this.setState( {plottable_scores: plottable_scores} );
    }
  }

  /**
    *   Compute stats from all_user_scores
    *   @return a json containing the stats
    */
  getScoreStats() {
    var fails = 0;
    var successes = 0;
    var ratio = 100;
    for (var i = 0; i < this.state.all_user_scores.length; i++) {
      if (this.state.all_user_scores[i].completed) successes++;
      else fails++;
    }
    if (fails + successes !== 0) ratio = 100 * successes / (successes + fails);
    return { 'fails' : fails, 'completed' : successes, 'ratio' : ratio };
  }

  /**
    *   Convert state.levels to format in which those can be passed to NavBar
    *   @return a list of jsons which contain attributes NavBar needs
    */
  getLevelsNav() {
    var levelNav = [];
    var i = 0;
    this.state.levels.forEach(entry => {
      if (i === 0) {
        levelNav.push( {'href' : void(0), 'name' : entry.name, 'active' : true, 'onClick' : () => this.getLevelScores(entry.name)});
      } else {
       levelNav.push( {'href' : void(0), 'name' : entry.name, 'active' : false, 'onClick' : () => this.getLevelScores(entry.name)});
      }
      i++; // just select the first level button as active
    });
    return levelNav;
  }

  /**
    *   Modify currently showed GameMode, this.currentGameMode
    *   Note: this should be connected to ToggleButtons
    */
  modifyScoreGameMode(gameModeValues) {
    var gameModes = [];
    gameModeValues.forEach(val => {
      gameModes.push(val);
    });
    this.currentGameMode = gameModes;
    this.getPlottableScores(gameModes);
  }

  /**
    *   Get max score for the selected level (from plottable_scores)
    *   @return max score for the level
    */
  getMaxLevelScore() {
    var max = Number.MIN_VALUE;
    this.state.plottable_scores.forEach(entry => {
      if (entry.y > max) max = entry.y;
    });
    return max;
  }

  /**
    *   Create plottable score distribution
    *   @param gameMode currently selected gameModes as an array
    *   @param level currently selected level as a string
    *   @return contents of state.every_score as plottable format
    */
  createScoreDistribution(gameModes, level) {
    var distribution = []; // an array of objects: {'x':score, 'y':frequency}
    var scores = new Map();
    this.state.every_score.forEach(entry => {
      if ((entry.level === level) && (gameModes.includes(entry.gameMode))) {
        var key = entry.score;
        if (scores.has(key)) scores.set(key, scores.get(key) + 1);
        else scores.set(key, 1);
      }
    });
    Array.from(scores.entries()).forEach(entry => {
      distribution.push( {'x' : entry[0], 'y' : entry[1]} );
    });
    return distribution;
  }

  /**
    *   Create labels for plotting the distribution as a BarChart
    *   @return an array of the x values used as labels
    */
  createDistributionLabels(distribution) {
    var labels = [];
    distribution.forEach(value => {
      labels.push(value.x);
    });
    return labels;
  }

  /**
    *   Render the whole score page
    */
  render() {
    if (this.state.needsRedirect) {
      return <Redirect to='/scores' />
    } else {
      var stats = this.getScoreStats();
      var levelsNav = this.getLevelsNav();
      var distribution = this.createScoreDistribution(this.currentGameMode, this.state.level);
      var topScore = this.getMaxLevelScore();
    }
    //console.log('plottable_scores: ', this.state.plottable_scores);
    if ((this.state.scoresReady) && (this.state.allScoresReady) && (this.state.levelsReady) && (this.state.gameModesReady)) {
      if (this.state.plottable_scores.length > this.MinScoresPlotted) {
        return (
          <div>
            <h1>{this.props.match.params.name} scores</h1>
            <BarChart data={[{'x' : 'Wins', 'y' : stats.completed}, {'x' : 'Losses', 'y' : stats.fails}]} specialxValues={['Wins']} labels={['Wins', 'Fails']} title='Career stats' offColor={this.CareerStatsOffColor} specialColor={this.CareerStatsWinColor}  standardColor={this.CareerStatsFailColor} width={this.PlotWidth} />
            <p className='stylishParagraph'>Completed: {stats.completed}<br/>Fails: {stats.fails}<br/>Success: {stats.ratio.toFixed(1)} %</p>
            <NavBar items={levelsNav} className='scoreNav'/>
            <CustomToggleButtons buttons={this.state.gameModes} onChange={this.modifyScoreGameMode.bind(this)} defaultValue={this.currentGameMode} className='toggleButtons' />
            <Graph data={this.state.plottable_scores}  domain={{ 'x': [1, this.state.plottable_scores.length], 'y' : [0, 300]}} title={`Score history: ${this.state.level}`} width={this.PlotWidth} color={this.GraphColor} scatterColor={this.GraphScatterColor} />
            <p className='stylishParagraph'><strong>Top score: {topScore}</strong></p>
            <BarChart data={distribution} title='Score distribution' labels={this.createDistributionLabels(distribution)} eventsOn={true} specialxValues={[topScore]} width={this.PlotWidth} offColor={this.DistributionOffColor} onColor={this.DistributionOnColor} standardColor={this.DistributionStandardColor} specialColor={this.DistributionSpecialColor} />
          </div>
        );
      } else {
        return (
          <div>
            <h1>{this.props.match.params.name} scores</h1>
            <BarChart data={[{'x' : 'Wins', 'y' : stats.completed}, {'x' : 'Losses', 'y' : stats.fails}]} specialxValues={['Wins']} labels={['Wins', 'Fails']} title='Career stats' offColor={this.CareerStatsOffColor} specialColor={this.CareerStatsWinColor}  standardColor={this.CareerStatsFailColor} width={this.PlotWidth} />
            <p className='stylishParagraph'>Completed: {stats.completed}<br/>Fails: {stats.fails}<br/>Success: {stats.ratio.toFixed(1)} %</p>
            <NavBar items={levelsNav} className='scoreNav'/>
            <CustomToggleButtons buttons={this.state.gameModes} onChange={this.modifyScoreGameMode.bind(this)} defaultValue={this.currentGameMode} className='toggleButtons' />
            <p className='stylishParagraph'>Not enough scores to plot history for <strong>{this.state.level}</strong></p>
          </div>
        );
      }
    } else {
      return (
        <div>
          <Loading animation={<div><h2>Loading</h2><img src={PlayerImage} alt='Loading' /></div>} />
        </div>
      );
    }
  }
}

export default Scores;
