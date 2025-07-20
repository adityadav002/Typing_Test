/** @format */

import "./App.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";
import SentenceDisplay from "./components/SentenceDisplay";
import Results from "./components/Results";
import NameInput from "./components/NameInput";
import { calculateAccuracy } from "./utils/util";

function App() {
  const Time = 60;
  const [btn, setBtn] = useState(false);
  const [countDown, setCountDown] = useState(Time);
  const [status, setStatus] = useState("waiting");
  const [text, setText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [inwpm, setInWpm] = useState(0);
  const [wordColors, setWordColors] = useState([]);
  const [name, setName] = useState("");
  const intervalRef = useRef(null);
  const textInput = useRef(null);

  const sentences = [
    ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"],
    ["Pack", "my", "box", "with", "five", "dozen", "liquor", "jugs"],
    ["Jinxed", "wizards", "pluck", "ivy", "from", "the", "big", "quilt"],
    ["The", "vixen", "jumped", "quickly", "over", "a", "frozen", "bog"],
    ["How", "quickly", "daft", "jumping", "zebras", "vex"],
    ["Amazingly", "few", "discotheques", "provide", "jukeboxes"],
    ["Quick", "zephyrs", "blow", "vexing", "daft", "Jim"],
    ["Two", "driven", "jocks", "help", "fax", "my", "big", "quiz"],
    ["Five", "quacking", "zephyrs", "jolt", "my", "wax", "bed"],
    ["The", "five", "boxing", "wizards", "jump"],
    ["Jumping", "zebras", "vex", "quaint", "bad", "wolf", "ghostly", "nymph"],
    ["Five", "quacking", "zephyrs", "jolt", "my", "wax", "bed"],
    ["Amazingly", "few", "discotheques", "provide", "jukeboxes"],
  ];
  const allWords = sentences.flat();

  useEffect(() => {
    if (status === "started") textInput.current?.focus();
  }, [status]);

  const start = () => {
    if (status === "finished") {
      setCurrentWordIndex(0);
      setWpm(0);
      setInWpm(0);
      setWordColors([]);
    }

    if (status !== "started") {
      setStatus("started");
      setBtn(true);
      setCountDown(Time);
      intervalRef.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            setStatus("finished");
            setBtn(false);
            setText("");
            return Time;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setBtn(false);
    setCountDown(Time);
    setText("");
    setWpm(0);
    setInWpm(0);
    setCurrentWordIndex(0);
    setWordColors([]);
    setStatus("waiting");
  };

  const handleKey = ({ keyCode }) => {
    if (keyCode === 32) {
      checkMatch();
      setText("");
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  const checkMatch = () => {
    const currentWord = allWords[currentWordIndex];
    const isMatch = currentWord === text.trim();
    if (isMatch) {
      setWpm((prev) => prev + 1);
      setWordColors((prev) => [...prev, "green"]);
    } else {
      setInWpm((prev) => prev + 1);
      setWordColors((prev) => [...prev, "red"]);
    }
  };

  const handleAdd = () => {
    const accuracy = calculateAccuracy(wpm, inwpm);
    axios
      .post("http://localhost:3000/api/insert", {
        name,
        wpm,
        accuracy,
      })
      .then(() => alert("Success"));
    reset();
  };

  return (
    <>
      <h1 className="heading">TYPING TEST</h1>
      <div className="navbar">
        <Navbar />
      </div>

      {status === "started" && (
        <SentenceDisplay words={allWords} colors={wordColors} />
      )}

      <TypingBox
        status={status}
        value={text}
        setValue={setText}
        inputRef={textInput}
        handleKey={handleKey}
        timer={countDown}
        onStart={start}
        onReset={reset}
        isStarted={btn}
      />

      {status === "finished" && (
        <Results
          wpm={wpm}
          inwpm={inwpm}
          accuracy={calculateAccuracy(wpm, inwpm)}>
          <NameInput name={name} setName={setName} onAdd={handleAdd} />
        </Results>
      )}
    </>
  );
}

export default App;
