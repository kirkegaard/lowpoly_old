import React from 'react';

import Header from './components/Header.js';

import Plasma from './experiments/Plasma';
import BouncyBalls from './experiments/BouncyBalls';
import Balls from './experiments/Balls';

import './App.scss';


const App = () => {
  return (
    <div className="app">
      <Header />
      <div>
        <Balls height={720} />
        <BouncyBalls height={720} />
        <Plasma height={720} />
      </div>
    </div>
  );
}

export default App;
