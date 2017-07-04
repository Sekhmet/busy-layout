import React from 'react';
import Affix from './Affix';

const App = () => (
  <div>
    <div className="topnav">
      <div className="topnav-layout container">
        <div className="left"></div>
        <div className="right"></div>
        <div className="center"></div>
      </div>
    </div>
    <div className="content feed-layout container">
      <Affix className="rightmarker">
        <div className="right"></div>
      </Affix>
      <Affix>
        <div className="left"></div>
      </Affix>
      
      <div className="center">
        <div className="loremipsum"></div>
      </div>
    </div>
  </div>
);

export default App;
