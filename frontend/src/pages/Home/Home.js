import React from 'react';
import { flipInX } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import ImageDisplay from '../../components/ImageDisplay';
import VideoPlayback from '../../components/VideoPlayback';
import './Home.css';

const TunnelEscapeTitle = require('../../assets/images/tunnelescape_title.svg');
const BonusLevelImage1 = require('../../assets/images/level_images/bonus_level_image1.png');
const BonusLevelImage2 = require('../../assets/images/level_images/bonus_level_image2.png');
const LevelCompletedImage = require('../../assets/images/level_images/level_completed.png');
const LevelFailedImage = require('../../assets/images/level_images/level_failed.png');
const Level1Image1 = require('../../assets/images/level_images/level1_image1.png');
const Level1Image2 = require('../../assets/images/level_images/level1_image2.png');
const Level2Image1 = require('../../assets/images/level_images/level2_image1.png');
const Level2Image2 = require('../../assets/images/level_images/level2_image2.png');
const Level3Image1 = require('../../assets/images/level_images/level3_image1.png');
const Level4Image1 = require('../../assets/images/level_images/level4_image1.png');
const Level4Image2 = require('../../assets/images/level_images/level4_image2.png');
const Level5Image1 = require('../../assets/images/level_images/level5_image1.png');
const Level5Image2 = require('../../assets/images/level_images/level5_image2.png');

const AnimationDiv = styled.div`animation: 5s ${keyframes `${flipInX}`}`;

// Level images and matching alts, the order must match between the arrays

const LevelImages = [ BonusLevelImage1, Level1Image1, Level2Image1, Level3Image1,
                      LevelFailedImage, Level5Image1, Level1Image2, BonusLevelImage2,
                      LevelCompletedImage, Level4Image1, Level2Image2, Level5Image2,
                      Level4Image2
                    ]
const LevelImageAlts = [ 'Bonus level image 1', 'Level1 image 1', 'Level2 image1', 'Level3 image 1',
                         'Level failed image', 'Level5 image 1', 'Level1 image 2', 'Bonus level image 2',
                         'Level completed image', 'Level4 image 1', 'Level2 image2', 'Level5 image 2',
                         'Level4 image 2'
                       ]

function Home() {
  return (
    <div>
      <AnimationDiv>
        <img src={TunnelEscapeTitle} alt='TunnelEscape' className='title' />
      </AnimationDiv>
      <h3><strong>TunnelEscape moments</strong></h3>
      <ImageDisplay images={LevelImages} alts={LevelImageAlts} className='imageDisplay'/>
       <p>TODO: add a real video</p>
      <VideoPlayback video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
    </div>
  );

}

export default Home;
