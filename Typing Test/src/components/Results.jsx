/** @format */

const Results = ({ wpm, inwpm, accuracy, children }) => (
  <div className="result">
    <div className="wpm">
      <h1 className="wpmnumber">{wpm}</h1>
      <span className="wpmtext">WPM</span>
    </div>
    <div className="accuracy">
      <span className="accuracytext">Accuracy :</span> {accuracy}%
    </div>
    <div className="cwpm">
      <span className="cwpmtext">Correct Words :</span>
      <span className="cwpmnumber">{wpm}</span>
    </div>
    <div className="inwpm">
      <span className="inwpmtext">Incorrect Words :</span>
      <span className="inwpmnumber">{inwpm}</span>
    </div>
    <div className="leaderBoard">{children}</div>
  </div>
);

export default Results;
