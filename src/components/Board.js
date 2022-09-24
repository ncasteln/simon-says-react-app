import React, { useEffect, useRef, useState } from "react";
import ColorButton from "./ColorButton";

const Board = ({ setStart }) => {
  const [sequence, setSequence] = useState(null);
  const [pointer, setPointer] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [isPlayed, setIsPlayed] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const data = [
    {
      color: 'blue',
      src: '/sounds/sound-00.wav'
    },
    {
      color: 'red',
      src: '/sounds/sound-01.wav'
    },
    {
      color: 'yellow',
      src: '/sounds/sound-02.wav'
    },
    {
      color: 'green',
      src: '/sounds/sound-03.wav'
    },
  ];

  const compareSequences = (playerInput) => {
    console.log(`You had to guess ${sequence[pointer]} and you selected ${playerInput}}`)
    if (playerInput === sequence[pointer]) {
      console.log('Right move!');
      setPointer(oldPointer => oldPointer + 1);
      if (pointer === sequence.length - 1) {
        setLevelCompleted(true);
        console.log(`Level Completed: ${levelCompleted}`);
      }
    } else {
      console.log('Wrong move!');
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
      audio.play();
      audio.onended = function() {
        setIsPlayed(false)
        if (i < sequence.length) {
          setIsPlayed(data[sequence[i]].color)
          audio.src = data[sequence[i]].src;
          audio.play();
          console.log(`Played ${audio.src}`)
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
      console.log(`Played the sequence ${sequence}`);
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
