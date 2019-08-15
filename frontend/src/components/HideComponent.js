/**
  *   @file HideComponent.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';

/**
  *   @class HideComponent
  *   Create component which swaps content on clicks (i.e. hides other components)
  */
class HideComponent extends Component {

  /**
    *   Constructor
    *   @param props props.components should be a list of components to be showed
    */
  constructor(props) {
    super(props);
    this.state = {
      current : 0
    }
  }

  /**
    *   Connect an event listener
    */
  componentDidMount() {
    window.addEventListener('click', this.updateWindow);
  }

  /**
    *   Disconnect the event listener
    */
  componentWillUnmount() {
    window.removeEventListener('click', this.updateWindow);
  }

  /**
    *   Update the showed component (hide previous one)
    */
  updateWindow = () => {
    if (this.props.components !== undefined) {
      this.increaseCurrent();
    }
  }

  /**
    *   Show next component by changing state.current
    */
  increaseCurrent() {
    if (this.state.current < this.props.components.length - 1) this.setState( {current : this.state.current + 1} );
    else this.setState( {current : 0} );
  }

  /**
    *   Render current component if compnents provided
    */
  render() {
    if (this.props.components !== undefined) {
      return (
        <div>
          {this.props.components[this.state.current]}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default HideComponent;
