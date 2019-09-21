/**
  *   @file About.js
  *   ScoreServer About page
  *   @author Lauri Westerholm
  */

import React from 'react';
import HideComponent from '../../components/HideComponent';
import './About.css';

const content = [
<p className='about'>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>,
<p className='about'><a href='https://github.com/lwesterl/ScoreServer' target='_blank'  rel='noopener noreferrer' className='about'>ScoreServer on GitHub</a></p>]

/**
  *   About
  *   Render About page
  */
function About() {
  return (
    <div>
      <div>
        <h1>About</h1>
        < HideComponent components={content} />
      </div>
      <div className='copyright'>
        © Lauri Westerholm 2019
      </div>
    </div>
  );

}

export default About;
