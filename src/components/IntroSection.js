const IntroSection = ({ setStart, setSoundBank }) => {
  const startGameWithSelectedBank = (textContent) => {
    const soundBank = textContent.split(' ')[4];
    setSoundBank(soundBank);
    setStart(true);
  }

  return (
    <div className="IntroSection">
      <h1>Simon Says</h1>
      <button className="IntroSection button" onClick={() => {setStart(true)}}>Start a New Game</button>
      <button className="IntroSection button" onClick={(e) => startGameWithSelectedBank(e.target.textContent)}>Start with Sound from Space</button>
      <button className="IntroSection button" onClick={(e) => startGameWithSelectedBank(e.target.textContent)}>Start with Sound from Farm</button>
      <button className="IntroSection button" onClick={(e) => startGameWithSelectedBank(e.target.textContent)}>Start with Sound from Orchestra</button>
    </div>
  )
}

export default IntroSection;