import React, { useEffect, useState } from 'react';
import IntroSection from './components/IntroSection';
import Board from './components/Board.js';
import './App.css';

const App = () => {
  const [start, setStart] = useState(false);
  const [soundBank, setSoundBank] = useState([])

  // const data = {
  //   'Space' : [
  //     {
  //       color: 'blue',
  //       src: '/space/sound-00.wav'
  //     },
  //     {
  //       color: 'red',
  //       src: '/space/sound-01.wav'
  //     },
  //     {
  //       color: 'yellow',
  //       src: '/space/sound-02.wav'
  //     },
  //     {
  //       color: 'green',
  //       src: '/space/sound-03.wav'
  //     }
  //   ],
  //   'Farm' : [
      
  //   ],
  //   'Orchestra' : [

  //   ]
  // }

  return (
    <div className='App'>
      {!start
        ? <IntroSection 
            setSoundBank={setSoundBank}
            setStart={setStart} />
        : <Board
            // soundBank={data[soundBank]} 
            setStart={setStart} />}
    </div>
  )
}

export default App;
