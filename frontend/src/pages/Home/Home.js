import React from 'react';
import ImageDisplay from '../../components/ImageDisplay';

const TestImage = require('../../assets/images/Player.png')

/** Todo: add proper images and other content */
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ImageDisplay images={[TestImage]} alts={['Test image']} />
    </div>
  );

}

export default Home;
