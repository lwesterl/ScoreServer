import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';

/**
  *   @class ScoresHome
  *   Home page for scores: provides functionality for searching specific user
  *   (links to Scores)
  */
class ScoresHome extends Component {
  constructor() {
    super();
    this.search = '';
  }

  updateSearch(event) {
    this.search = event.target.value;
  };

  userSubmit(event) {
    this.props.history.push(`/scores/${this.search}`);

  }

  render() {
    return (
      <SearchBar placeholder='Username' onSubmit={this.userSubmit.bind(this)} onChange={this.updateSearch.bind(this)} />
    );
  }

}

export default ScoresHome;
