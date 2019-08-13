import React, { Component } from 'react';


/**
  *   @class ScoreTable
  *   Displays scores (top scores)
  *   props.data: scores to be displayed
  *   Todo: make much nicer
  */
class ScoreTable extends Component {

  /**
    *   Render ScoreTable
    *   If no data provided, renders nothing
    */
  render() {
    if (this.props.data !== undefined) {
      var rows = [];
      this.props.data.forEach(score => {
        rows.push(<tr key={score.id}><td>{score.name}</td><td>{score.score}</td><td>{score.level}</td><td>{score.time}</td></tr>);
      });
      return (
        <div>
          <h2>All time top scores</h2>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );

    } else {
      return (
        null
      );
    }
  }
}

export default ScoreTable;
