import React, { Component } from 'react';
import { VictoryGroup, VictoryBar } from 'victory';


/**
  *   @class BarChart
  *   Implements VictoryBar and wraps it to a div
  *   Note: pass title, data and labels as props
  *   title: showed as barchart title
  *   data: data to be plotted as an array of objects (x: , y:)
  *   labels: plot labels as an array
  */
class BarChart extends Component {

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <VictoryGroup data={this.props.data}>
          <VictoryBar labels={this.props.labels}/>
        </VictoryGroup>
      </div>
    );
  }
}

export default BarChart;
