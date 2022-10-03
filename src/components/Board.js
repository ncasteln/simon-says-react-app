import React, { useEffect, useState } from "react";
import ColorButton from "./ColorButton";
import sound_00 from '../sounds/sound_00.wav'
import sound_01 from '../sounds/sound_01.wav'
import sound_02 from '../sounds/sound_02.wav'
import sound_03 from '../sounds/sound_03.wav'

const Board = ({ setStart }) => {
  const [sequence, setSequence] = useState(null);
  const [pointer, setPointer] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [isPlayed, setIsPlayed] = useState([]);
  const [disabled, setDisabled] = useState(true);
  
  const data = [
    {
      color: 'blue',
      src: sound_00
    },
    {
      color: 'red',
      src: sound_01
    },
    {
      color: 'yellow',
      src: sound_02
    },
    {
      color: 'green',
      src: sound_03
    },
  ];

  const compareSequences = (playerInput) => {
    if (playerInput === sequence[pointer]) {
      setPointer(oldPointer => oldPointer + 1);
      if (pointer === sequence.length - 1) {
        setLevelCompleted(true);
      }
    } else {
      return false;
    }
    return true;
  }

  const updateSequence = () => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 4);
      setSequence([...sequence, randomNumber]);
      setPointer(0);
      setLevelCompleted(false);
    }, 1000);
  }

  const resetGame = () => {
    setSequence(null);
    setPointer(0);
    setLevelCompleted(false);
  }

  const handleClick = (src, playerInput) => {
    const audio = new Audio(src);
    audio.play();
    if (compareSequences(playerInput)) {
      if (levelCompleted) {
        updateSequence();
      }
    } else {
      resetGame();
      setStart(false);
    }
  };

  const playSequence = () => {
    let i = 1;
    setTimeout(() => {
      setDisabled(true);
      setIsPlayed(data[sequence[0]].color);
      const audio = new Audio(data[sequence[0]].src);
      audio.play()
      audio.onended = function() {
        setIsPlayed(false)
        if (i < sequence.length) {
          setIsPlayed(data[sequence[i]].color)
          audio.src = data[sequence[i]].src;
          audio.play();
          i++;
        }
      };
      setDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 4);
    setSequence([randomNumber]);
  }, []);

  useEffect(() => {
    if (levelCompleted) {
      updateSequence();
    }
  }, [levelCompleted]);

  useEffect(() => {
    if(sequence) {
      playSequence();
    }
  }, [sequence]);
  
  const buttonList = data.map((item, i) => {
    return (
      <ColorButton 
        key={i} 
        playerInput={i}
        color={item.color}
        src={item.src}
        handleClick={handleClick}
        isPlayed={isPlayed}
        disabled={disabled}
      />
    )
  })

  return (
    <div>
      {sequence
        ? <h2>Level {sequence.length}</h2>
        : null
      }
      <div className="Board">
        {buttonList}
      </div>
    </div>
  )
}

export default Board;
