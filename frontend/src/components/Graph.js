/**
  *   @file Graph.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';
import { VictoryGroup, VictoryLine, VictoryScatter } from 'victory';

/**
  *   @class Graph
  *   Create graphs using victory
  *   Note:
  *   data: to be drawed with format: [ { 'x' : 2, 'y' : 1 } ]
  *   domain: x and y limits with format: { 'x': [1, 100], 'y' : [0, 300]}
  *   title: showed as graph title
  *   width: div width used for the graph, defaults to 100%
  *   color: color used for the graph
  *   scatterColor: color used for the datapoints in the graph
  */
class Graph extends Component {

  /**
    *   Constructor
    *   @param props props passed by the parent
    */
  constructor(props) {
    super(props);
    this.width = props.width === undefined ? '100%' : props.width;
    this.color = props.color === undefined ? 'black' : props.color;
    this.scatterColor = props.scatterColor === undefined ? 'black' : props.scatterColor;
  }

  /**
    *   Render the Graph
    */
  render() {
    return (
      <div style={{width : this.width, margin : 'auto'}}>
        <h3>{this.props.title}</h3>
        <VictoryGroup data={this.props.data}>
          <VictoryLine
            domain={this.props.domain}
            style={{data: {stroke : this.color}}}

            animate={{
              duration: 1000,
              onLoad: { duration: 1000 }}}
            />
            <VictoryScatter size={4} symbol="diamond" style={{data : {fill : this.scatterColor}}} />
        </VictoryGroup>
      </div>
    );
  }
}

export default Graph;
