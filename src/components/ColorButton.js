import React from "react";

const ColorButton = ({ color, src, playerInput, handleClick, isPlayed, disabled }) => {  
  return (
    <div className="ColorButton container">
      <audio src={src}></audio>
      <button className={`ColorButton button ${color} ${isPlayed === color ? "isPlayed" : ""}`}
        onClick={() => handleClick(src, playerInput)}
        disabled={disabled}>
      </button>
    </div>
  )
}

export default ColorButton;
