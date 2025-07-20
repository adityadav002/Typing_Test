/** @format */

import Navbar from "../components/Navbar";
function About() {
  return (
    <>
      <h1 className="about_heading">ABOUT</h1>
      <div className="navbar navbar-about">
        <Navbar />
      </div>
      <div className="about-container">
        <p>
          TypingTest, the ultimate destination for improving your typing speed
          and accuracy.
        </p>
        <hr />
        <p>
          Our website is designed to help users of all skill levels practice
          typing using pangrams.
        </p>
        <hr />
        <p>
          Panagram:Pangram is a unique sentence that includes every letter from
          A to Z.
        </p>
        <hr />
        <p>
          By practicing with pangrams, you’ll develop better finger placement,
          increase your typing speed, and enhance your accuracy
        </p>
      </div>
    </>
  );
}

export default About;
