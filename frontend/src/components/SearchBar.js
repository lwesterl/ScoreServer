import React, { Component } from 'react';

/**
  *   @class SearchBar
  *   Show a searchbar
  *   Note: pass onSubmit and onChange as props
  *   Todo: make much nice looking
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
        <form className='search' onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    );
  }
}

export default SearchBar;