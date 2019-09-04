import React, { Component } from 'react';
import ClickableAction from './ClickableAction';


/**
  *   @class NavBar
  *   Create navbars with hrefs and onClick functionality
  *   props.items: list of jsons which contain name, href and onClick values
  */
class NavBar extends Component {

  /**
    *   Constructor
    *   @param props passed from parent
    *   props.className: a css class used
    */
  constructor(props) {
    super(props);
    this.clickableActionRefs = [];
    this.navs = []
    this.props.items.forEach(item => {
      this.navs.push(<li key={item.name} className={this.props.className}><ClickableAction ref={this.setRef} href={item.href} onClick={item.onClick} name={item.name} active={item.active} className='scoreNav' activeClassName='activatedScoreNav' parentAction={this.deactivateClickables.bind(this)}/></li>)
    });
  }

  /**
    *   Connect refs to ClickableActions
    */
  setRef = (ref) => {
    this.clickableActionRefs.push(ref);
  };

  /**
    *   Deactivate all ClickableActions
    *   This should be passed as parentAction to ClickableActions
    */
  deactivateClickables() {
    this.clickableActionRefs.forEach(ref => {
      ref.deactivate();
    });
  }

  /**
    *   Render NavBar
    */
  render() {
    return (
      <div className={this.props.className}>
        <ul id='nav' className={this.props.className}>
          {this.navs}
        </ul>
      </div>
    );
  }
}

export default NavBar;
