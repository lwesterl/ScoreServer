import React from 'react';
import HideComponent from '../../components/HideComponent';

function About() {
  return (
    <div>
      <h1>About</h1>
      < HideComponent components={[<h2>hello</h2>, <p>Hello hello something text</p>]} />
    </div>
  );

}

export default About;
