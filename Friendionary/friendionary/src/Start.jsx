import React from 'react';
import './Start.css';

function Start() {
  return (
    <div className="start-container">
      <h1>Welcome !</h1>
      <p>What would you like to do next?</p>

      <div className="button-container">
        <a href="/game" className="game-button">Let's Play</a>
        <a href="/modifyWord" className="modify-button">Let's Make a Change</a>
      </div>
    </div>
  );
}

export default Start;
