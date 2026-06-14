function Button({
  children,
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background:
          "var(--primary-color)",
        color: "#fff",
        border: "none",
        padding:
          "10px 18px",
        borderRadius:
          "8px",
        cursor: "pointer",
        fontWeight:
          "600",
      }}
    >
      {children}
    </button>
  );
}

export default Button;