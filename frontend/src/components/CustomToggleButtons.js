/**
  *   @file CustomToggleButtons.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

/**
  *   @class CustomToggleButtons
  *   Implements ToggleButtons based on bootstrap ToggleButtons
  *   props.buttons: an array of jsons containing button value and button name attributes
  *   props.onChange: function called when some button is toggled
  *   props.defaultValue: an array of button values for those buttons which should be initially toggled
  *   props.className: a css class used
  */
class CustomToggleButtons extends Component {

  /**
    *   Render the toggle buttons
    */
  render() {
    var buttons = [];
    this.props.buttons.forEach(button => {
      buttons.push(<ToggleButton key={button.value} value={button.value} className={this.props.className}>{button.name}</ToggleButton>);
    });

    return (
      <ToggleButtonGroup type="checkbox" onChange={this.props.onChange} defaultValue={this.props.defaultValue} className={this.props.className}>
        {buttons}
      </ToggleButtonGroup>
    );
  }

}

export default CustomToggleButtons;
