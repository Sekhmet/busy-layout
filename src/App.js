import React from 'react';
import Affix from './Affix';

const App = () => (
  <div>
    <div className="topnav">
      <div className="topnav-layout container">
        <div className="left" />
        <div className="right" />
        <div className="center" />
      </div>
    </div>
    <div className="content container jumbotron" />
    <div className="feed-layout container">
      {/*<Affix stickPosition={72}>
        <div className="right" />
      </Affix>*/}
      <Affix className="pull-left" stickPosition={72}>
        <div className="left" />
      </Affix>
      <div className="center">
        <div className="loremipsum" />
      </div>
    </div>
  </div>
);

export default App;
