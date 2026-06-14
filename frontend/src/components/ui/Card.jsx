function Card({
  children,
}) {
  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "20px",
        borderRadius:
          "10px",
        boxShadow:
          "var(--shadow)",
      }}
    >
      {children}
    </div>
  );
}

export default Card;