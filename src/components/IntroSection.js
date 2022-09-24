const IntroSection = ({ setStart }) => {
  return (
    <div className="IntroSection">
      <h1>SIMON SAYS</h1>
      <button className="IntroSection button" onClick={() => {setStart(true)}}>Start a New Game</button>
    </div>
  )
}

export default IntroSection;