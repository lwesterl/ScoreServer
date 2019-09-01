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
      var rows = [<tr key='-1'><td><strong>&#35;</strong></td><td><strong>Name</strong></td><td><strong>Score</strong></td><td><strong>Level</strong></td><td><strong>Time</strong></td></tr>];
      var i = 1;
      this.props.data.forEach(score => {
        rows.push(<tr key={score.id}><td>{i}</td><td>{score.name}</td><td>{score.score}</td><td>{score.level}</td><td>{score.time}</td></tr>);
        i++;
      });
      return (
        <div>
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
