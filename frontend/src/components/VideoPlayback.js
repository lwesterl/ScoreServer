/**
  *   @file VideoPlayback.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';


class VideoPlayback extends Component {

  /**
    *   Constructor for VideoPlayback
    *   Init state
    */
  constructor(props) {
    super(props);

    this.state = {
      paused : true
    }
    this.videoRef = React.createRef();
  }

  /**
    *   Play video on onMouseEnter
    */
  mouseEnter() {
    this.setState( {paused : false}, () => this.play());
  }

  /**
    *   Pause video on onMouseLeave
    */
  mouseLeave() {
    this.setState( {paused : true}, () => this.play());
  }

  /**
    *   Play/stop video playback depending on the state.paused
    */
  play() {
    console.log(this.state.paused)
    if (this.videoRef.current) {
      if (this.state.paused) this.videoRef.current.pause();
      else this.videoRef.current.play();
    }
  }

  /**
    *   Render
    *   Show a video which is played on hover or touch
    *   If no video provided, render null
    */
  render() {
    if (this.props.video !== undefined) {
      return (
        <div>
          <video onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} ref={this.videoRef} src={this.props.video} type='video/mp4' />
        </div>
      );
    } else {
      return null;
    }
  }

}

export default VideoPlayback;
