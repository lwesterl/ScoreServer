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

  /**
    *   Constructor for BarChart
    *   @param props props passed from the parent react component
    *   eventsOn: whether mouse hover events are enabled, boolean
    *   onColor: color used on labels when mouse is over the data, defaults to black
    *   offColor: color used on labels when mouse if off the data, defaults to transparent
    *   standardColor: color used on datapoints which are not in props.specialxValues array
    *   specialColor: color used on datapoints which are in props.specialxValues
    *   specialxValues: an array of special x values, used to draw datapoints
    *   with different color, see above
    *   Note: it's only possible to set all the colors and eventsOn when the component
    *   is created, meanwhile specialxValues can be updated dynamically
    */
  constructor(props) {
    super(props);
    this.eventsOn = props.eventsOn === undefined ? false : true;
    this.onColor = props.onColor === undefined ? 'black' : props.onColor;
    this.offColor = props.offColor === undefined ? 'transparent' : props.offColor;
    this.standardColor = props.standardColor === undefined ? 'gray' : props.standardColor;
    this.specialColor = props.specialColor === undefined ? 'black' : props.specialColor;
  }

  /**
    *   Render the chart
    *   When eventsOn prop is true, labels are show on mouse hover
    */
  render() {
    if (this.eventsOn) {
      return (
        <div>
          <h3>{this.props.title}</h3>
          <VictoryGroup data={this.props.data}>
            <VictoryBar labels={this.props.labels}
              style={{
                data: {
                  fill: ({ x }) =>
                    this.props.specialxValues.includes(x) ? this.specialColor : this.standardColor
                },
                labels: {
                  fill: this.offColor
                }
              }}
              events={[{
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => {
                      return [
                      {
                        target: 'labels',
                        mutation: (props) => {
                          return { style: { fill: this.onColor } };
                        }
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [{
                      target: 'labels',
                      mutation: () => {
                        return { style: { fill: this.offColor } };
                      }
                    }];
                  }
                }
              }]}
            />
          </VictoryGroup>
        </div>
      );
    } else {
      return (
        <div>
          <h3>{this.props.title}</h3>
          <VictoryGroup data={this.props.data}>
            <VictoryBar labels={this.props.labels}
              style={{
                data: {
                  fill: ({ x }) =>
                    this.props.specialxValues !== undefined && this.props.specialxValues.includes(x) ? this.specialColor : this.standardColor
                },
                labels: {
                  fill: this.offColor
                }
              }}
            />
          </VictoryGroup>
        </div>
      );
    }
  }
}

export default BarChart;
