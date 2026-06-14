function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "10px",
        border:
          "1px solid var(--border-color)",
        borderRadius:
          "8px",
        minWidth: "180px",
        fontSize: "14px",
        outline: "none",
      }}
    />
  );
}

export default Input;