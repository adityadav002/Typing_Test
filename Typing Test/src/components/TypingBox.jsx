/** @format */

import { FaPlay } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";

const TypingBox = ({
  status,
  value,
  setValue,
  inputRef,
  handleKey,
  timer,
  onStart,
  onReset,
  isStarted,
}) => (
  <div className="container">
    <input
      className="input"
      type="text"
      placeholder="Start typing..."
      onKeyDown={handleKey}
      disabled={status !== "started"}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <span className="btn">
      {isStarted ? (
        <button onClick={onReset}>
          <RiResetLeftLine />
        </button>
      ) : (
        <button onClick={onStart}>
          <FaPlay />
        </button>
      )}
    </span>
    <span className="timer">{timer}</span>
  </div>
);

export default TypingBox;
