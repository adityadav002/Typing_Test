/** @format */

const NameInput = ({ name, setName, onAdd }) => (
  <span>
    <input
      type="text"
      placeholder="Enter your name.."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <button className="add" onClick={onAdd}>
      ADD
    </button>
  </span>
);

export default NameInput;
