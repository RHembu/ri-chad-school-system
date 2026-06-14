function DateInput({
  value,
  onChange,
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        border:
          "1px solid var(--border-color)",
        borderRadius:
          "8px",
        fontSize: "14px",
        outline: "none",
      }}
    />
  );
}

export default DateInput;