/**
  *   @file ClickableAction.js
  *   @author Lauri Westerholm
  */

import React, {Component} from 'react';


/**
  *   @class ClickableAction
  *   Implements an action which is clickable
  */
class ClickableAction extends Component {

  /**
    *   Constructor
    *   @param props passed from parent
    *   props.active: initial state, ie. is the item active
    *   props.href: link destination for the action
    *   props.onClick: function executed when the item is clicked
    *   props.parentAction: parent function executed when the item is clicked, executed prior onClick
    *   props.className: a css class used when not active
    *   props.activeClassName: a css class used when active
    */
  constructor(props) {
    super(props);
    const active = this.props.active === undefined ? false : this.props.active;
    this.state = {
      active : active
    }
  }

  /**
    *   Set state active
    */
  activate() {
    this.setState({active : true});
  }

  /**
    *   Set state not active
    */
  deactivate() {
    this.setState({active: false});
  }

  /**
    *   Action executed when item is clicked
    *   Calls possible props.parentAction and props.onClick
    */
  clicked() {
    if (this.props.parentAction) this.props.parentAction();
    this.activate();
    if (this.props.onClick) this.props.onClick();
  }

  /**
    *   Render based on the active state
    */
  render() {
    if (this.state.active) {
      return (
        <a href={this.props.href} onClick={this.clicked.bind(this)} className={this.props.activeClassName}>{this.props.name}</a>
      );
    } else {
      return (
        <a href={this.props.href} onClick={this.clicked.bind(this)} className={this.props.className}>{this.props.name}</a>
      )
    }
  }

}

export default ClickableAction;
