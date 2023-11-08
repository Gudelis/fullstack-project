import "./submitInput.css";

export const SubmitInput = ({ submitValue, onClick }) => {
  return (
    <input
      type="submit"
      value={submitValue}
      onClick={onClick}
      className="submit"
    />
  );
};
