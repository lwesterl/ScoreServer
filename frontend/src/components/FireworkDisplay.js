/**
  *   @file FireworkDisplay.js
  *   @author Lauri Westerholm
  */

import { Component } from 'react';

const Fireworks = require('fireworks-canvas');


/**
  *   @class FireworkDisplay
  *   Creates firework effect to specific element
  *   this.props.componentID: id for the element fireworks are displayed on
  */
class FireworkDisplay extends Component {

  constructor() {
    super();
    this.fireworks = null;
  }

  render() {
    return null;
  }

  /**
    *   Start the fireworks if container valid
    */
  componentDidMount() {
    const container = document.getElementById(this.props.componentID);
    if (container) {
      this.fireworks = new Fireworks(container);
      this.fireworks.start();
    }
  }

  componentWillUnmount() {
    if (this.fireworks) this.fireworks.kill();
  }
}



export default FireworkDisplay;
