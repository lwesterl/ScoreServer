import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

/**
  *   @class CustomToggleButtons
  *   Implements ToggleButtons based on bootstrap ToggleButtons
  *   props.buttons: an array of jsons containing button value and button name attributes
  *   props.onChange: function called when some button is toggled
  *   props.defaultValue: an array of button values for those buttons which should be initially toggled
  */
class CustomToggleButtons extends Component {

  render() {
    var buttons = [];
    this.props.buttons.forEach(button => {
      buttons.push(<ToggleButton key={button.value} value={button.value}>{button.name}</ToggleButton>);
    });

    return (
      <ToggleButtonGroup type="checkbox" onChange={this.props.onChange} defaultValue={this.props.defaultValue}>
        {buttons}
      </ToggleButtonGroup>
    );
  }

}

export default CustomToggleButtons;
