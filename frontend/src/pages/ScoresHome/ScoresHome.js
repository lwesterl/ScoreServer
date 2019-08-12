import React, { Component } from 'react';
import ScoreTable from '../../components/ScoreTable';
import SearchBar from '../../components/SearchBar';

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
      topScoresLoaded : false
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
      this.fetchTopScores();
    }, 10000);
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
        console.log('topScores:', this.state.topScores);
      }
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
    *   event: not used
    */
  userSubmit(event) {
    this.props.history.push(`/scores/${this.search}`);

  }

  /**
    *   Render ScoresHome: display top scores and SearchBar
    */
  render() {
    if (this.state.topScoresLoaded) {
      return (
        <div>
          <ScoreTable data={this.state.topScores} />
          <SearchBar placeholder='Username' onSubmit={this.userSubmit.bind(this)} onChange={this.updateSearch.bind(this)} />
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
