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
      const header = [<tr key='-1' className={this.props.className}><td label='&#35;'><strong>&#35;</strong></td><td label='Name'><strong>Name</strong></td><td label='Score'><strong>Score</strong></td><td label='Level'><strong>Level</strong></td><td label='Time'><strong>Time</strong></td></tr>];
      var rows = [];
      var i = 1;
      this.props.data.forEach(score => {
        rows.push(<tr key={score.id} className={this.props.className}><td label='&#35;'>{i}</td><td label='Name'>{score.name}</td><td label='Score'>{score.score}</td><td label='Level'>{score.level}</td><td label='Time'>{score.time}</td></tr>);
        i++;
      });
      return (
        <div>
          <table>
            <thead>
              {header}
            </thead>
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
