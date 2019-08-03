import React, { Component } from 'react';
import { VictoryGroup, VictoryLine } from 'victory';

/**
  *   @class Graph
  *   Create graphs using victory
  *   Note:
  *   data: to be drawed with format: [ { 'x' : 2, 'y' : 1 } ]
  *   domain: x and y limits with format: { 'x': [1, 100], 'y' : [0, 300]}
  *   title: showed as graph title
  */
class Graph extends Component {
  
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <VictoryGroup>
          <VictoryLine
            data={this.props.data}
            domain={this.props.domain}

            animate={{
              duration: 5000,
              onLoad: { duration: 1000 }}}
            />
        </VictoryGroup>
      </div>
    )
  }
}

export default Graph;