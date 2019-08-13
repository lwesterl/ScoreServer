import React, { Component } from 'react';


/**
  *   @class ImageDisplay
  *   Component for displaying auto-changing images
  */
class ImageDisplay extends Component {

  /**
    *   Constructor
    *   Initializes state
    *   @param props props passed from parent
    *   props.images to be displayed in list and in image src format
    *   props.alts list of texts to be displayed as alt texts for the images (empty alts used if not provided)
    *   props.interval image update interval, if not passed a default value is used 
    *
    */
  constructor(props) {
    super(props);
    this.state = {
      currentImage : 0,
    }
    this.imagesExist = true;
    if (props.images === undefined) this.imagesExist = false;
  }

  /**
    *   Start updating the displayed image
    */
  componentDidMount() {
    const interval = this.props.interval === undefined ? 5000 : this.props.interval;
    this.updateInterval = setInterval(() => {
      this.loopImages();
    }, interval);
  }

  /**
    *   Loop through all images provided as props
    */
  loopImages() {
    if (this.imagesExist) {
      if (this.state.currentImage < this.props.images.length - 1) {
        this.setState( {currentImage : this.state.currentImage + 1} );
      } else {
        this.setState( {currentImage : 0} );
      }
    }
  }

  /**
    *   Render an image or if no images provided as props, return null
    */
  render() {
    if (this.imagesExist) {
      const alt = ((this.props.alts === undefined) || (this.props.alts.length !== this.props.images.length)) ? '' : this.props.alts[this.state.currentImage];
      return (
        <div>
        <img src={this.props.images[this.state.currentImage]} alt={alt} />
        </div>
      );
    } else {
      return null;
    }
  }

}

export default ImageDisplay;
