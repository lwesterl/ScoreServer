import React from 'react';
import ImageDisplay from '../../components/ImageDisplay';
import VideoPlayback from '../../components/VideoPlayback';

const TestImage = require('../../assets/images/Player.png')

/** Todo: add proper images and other content */
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ImageDisplay images={[TestImage]} alts={['Test image']} />
      <VideoPlayback video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
    </div>
  );

}

export default Home;
