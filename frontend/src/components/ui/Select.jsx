function Select({
  value,
  onChange,
  options = [],
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        border:
          "1px solid var(--border-color)",
        borderRadius:
          "8px",
        minWidth: "180px",
        fontSize: "14px",
      }}
    >
      {options.map(
        (option) => (
          <option
            key={option.value}
            value={
              option.value
            }
          >
            {option.label}
          </option>
        )
      )}
    </select>
  );
}

export default Select;