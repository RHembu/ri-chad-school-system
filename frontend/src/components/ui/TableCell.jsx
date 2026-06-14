function TableCell({
  children,
}) {
  return (
    <td
      style={{
        padding: "12px",
        borderBottom:
          "1px solid var(--border-color)",
      }}
    >
      {children}
    </td>
  );
}

export default TableCell;