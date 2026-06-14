function Badge({
  children,
  type = "success",
}) {
  const colors = {
    success:
      "var(--success-color)",
    warning:
      "var(--warning-color)",
    danger:
      "var(--danger-color)",
  };

  return (
    <span
      style={{
        background:
          colors[type],
        color: "#fff",
        padding:
          "4px 12px",
        borderRadius:
          "20px",
        fontWeight:
          "bold",
      }}
    >
      {children}
    </span>
  );
}

export default Badge;