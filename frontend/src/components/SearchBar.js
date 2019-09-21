/**
  *   @file SearchBar.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';

/**
  *   @class SearchBar
  *   Show a searchbar
  *   Note: pass onSubmit and onChange as props
  */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.onChange;
    this.handleSubmit = this.props.onSubmit;
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input required type="text" pattern='^[a-zA-Z0-9 _.-]*$' title='No special characters allowed' onChange={this.handleChange} placeholder={this.props.placeholder} />
       </form>
      </div>
    );
  }
}
export default SearchBar;
