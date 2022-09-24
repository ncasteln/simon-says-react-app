import React, { useState } from 'react';
import IntroSection from './components/IntroSection';
import Board from './components/Board.js';
import './App.css';

const App = () => {
  const [start, setStart] = useState(false);

  return (
    <div className='App'>
      {!start
        ? <IntroSection setStart={setStart} />
        : <Board setStart={setStart} />}
    </div>
  )
}

export default App;
