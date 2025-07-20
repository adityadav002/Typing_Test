/** @format */

const SentenceDisplay = ({ words, colors }) => (
  <div className="sentence">
    {words.map((word, index) => (
      <span
        key={index}
        style={{ color: colors[index] || "black", marginRight: "5px" }}>
        {word}{" "}
      </span>
    ))}
  </div>
);

export default SentenceDisplay;
