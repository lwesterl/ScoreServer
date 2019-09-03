import React, { Component } from 'react';

const Fireworks = require('fireworks-canvas');


/**
  *   @class FireworkDisplay
  *   Creates firework effect to specific element
  *   this.props.componentID: id for the element fireworks are displayed on
  */
class FireworkDisplay extends Component {
  render() {
    return null;
  }

  /**
    *   Start the fireworks if container valid
    */
  componentDidMount() {
    const container = document.getElementById(this.props.componentID);
    if (container) {
      const fireworks = new Fireworks(container);
      fireworks.start();
    }
  }
}



export default FireworkDisplay;
