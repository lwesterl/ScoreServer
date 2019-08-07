import React, { Component } from 'react';


/**
  *   @class NavBar
  *   Create navbars with hrefs and onClick functionality
  *   props.items: list of jsons which contain name, href and onClick values
  */
class NavBar extends Component {

  render() {
    var navs = []
    this.props.items.forEach(item => {
      navs.push(<li key={item.name}><a href={item.href} onClick={item.onClick}>{item.name}</a></li>)
    });
    return (
      <div>
        <ul id='nav'>
          {navs}
        </ul>
      </div>
    );
  }
}

export default NavBar;
