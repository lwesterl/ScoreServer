/**
  *   @file ScoresHome.js
  *   Home page for scores, displays the top scores and allows to search for user
  *   specific scores
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';
import ScoreTable from '../../components/ScoreTable';
import SearchBar from '../../components/SearchBar';
import FireworkDisplay from '../../components/FireworkDisplay';
import './ScoresHome.css';

/**
  *   @class ScoresHome
  *   Home page for scores: provides functionality for searching specific user
  *   (links to Scores)
  */
class ScoresHome extends Component {

  _isMounted = false;

  /**
    *   Contructor
    *   Initializes state
    */
  constructor() {
    super();
    this.state = {
      topScores : [],
      topScoresLoaded : false,
      error : false
    }
    this.search = '';
    this.ScoreLen = 10;
  }

  /**
    *   After component is mounted, fetch top scores
    *   Calls fetchTopScores periodically to update displayed top scores
    */
  componentDidMount() {
    this._isMounted = true;
    this.fetchTopScores();
    this.updateInterval = setInterval(() => {
      if (this._isMounted) this.fetchTopScores();
    }, 10000);
  }

  /**
    *   Deny updating the scores
    */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
    *   Fetch top scores from backend api
    */
  fetchTopScores() {
    fetch(`/api/scores/top_scores?limit=${this.ScoreLen}`)
    .then(res => res.json())
    .then(scores => {
      if (this._isMounted) {
        this.setState( {topScores : scores });
        this.setState( {topScoresLoaded : true });
        //console.log('topScores:', this.state.topScores);
      }
    })
    .catch((error) => {
      // console.log(error);
      this.setState( {error: true} );
    });
  }

  /**
    *   Update search from SearchBar
    *   @param event update event from SearchBar
    */
  updateSearch(event) {
    this.search = event.target.value;
  };

  /**
    *   Submit search from SearchBar
    *   @param event form submission event
    */
  userSubmit(event) {
    event.preventDefault(); // prevent the form itself from being submitted
    this.props.history.push(`/scores/${this.search}`);
  }

  /**
    *   Render ScoresHome: display top scores and SearchBar
    */
  render() {
    if (this.state.topScoresLoaded) {
      return (
        <div id='fireworks'>
          <FireworkDisplay componentID='fireworks'/>
          <h2 className='greenTheme'>Top scores</h2>
          <ScoreTable data={this.state.topScores} className='greenTheme'/>
          <h2>Score statistics</h2>
          <SearchBar placeholder='Username' onSubmit={this.userSubmit.bind(this)} onChange={this.updateSearch.bind(this)} />
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <h3>Sorry, no statistics can be displayed at the moment</h3>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }

}

export default ScoresHome;
