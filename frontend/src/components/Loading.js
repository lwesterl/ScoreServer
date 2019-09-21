/**
  *   @file Loading.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';
import { flash } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const AnimationDiv = styled.div`animation: 6s ${keyframes`${flash}`} infinite`;

/**
  *   @class Loading
  *   Component showed when frontend is waiting for backend operation to finish
  *   props.animation: animated content
  */
class Loading extends Component {

  /**
    *   Render the animation or return null if no props.animation
    */
  render() {
  if (this.props.animation !== undefined) {
      return (
        <AnimationDiv>
          {this.props.animation}
        </AnimationDiv>
      );
    } else {
      return null;
    }
  }
}

export default Loading;
