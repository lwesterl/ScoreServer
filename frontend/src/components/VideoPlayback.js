/**
  *   @file VideoPlayback.js
  *   @author Lauri Westerholm
  */

import React, { Component } from 'react';


class VideoPlayback extends Component {

  _isMounted = false;

  /**
    *   Constructor for VideoPlayback
    *   Init state
    */
  constructor(props) {
    super(props);

    this.state = {
      paused : true,
      muted : true
    }
    this.videoRef = React.createRef();
  }

  /**
    *   Component is mounted, allow updating
    */
  componentDidMount() {
    this._isMounted = true;
  }

  /**
    *   Component will unmount, deny updating
    */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
    *   Play video on onMouseEnter
    */
  mouseEnter() {
    if (this._isMounted) this.setState( {paused : false}, () => this.play());
  }

  /**
    *   Pause video on onMouseLeave
    */
  mouseLeave() {
    if (this._isMounted) this.setState( {paused : true}, () => this.play());
  }

  /**
    *   Unmute/mute video
    *   Changes state muted
    */
  unmute() {
    if (this._isMounted) this.setState( {muted : !this.state.muted}, () => this.videoRef.current.muted = this.state.muted);
  }

  /**
    *   Play/stop video playback depending on the state.paused
    */
  play() {
    if (this.videoRef.current) {
      if (this.state.paused) this.videoRef.current.pause();
      else this.videoRef.current.play();
    }
  }

  /**
    *   Render
    *   Show a video which is played on hover or touch
    *   If no video provided, render null
    *   Note: modern browsers support only video autoplay in muted mode, the video needs to be clicked to unmute it
    */
  render() {
    if (this.props.video !== undefined) {
      return (
        <div>
          <video muted={true} onClick={this.unmute.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} ref={this.videoRef} src={this.props.video} type='video/mp4' />
        </div>
      );
    } else {
      return null;
    }
  }

}

export default VideoPlayback;
