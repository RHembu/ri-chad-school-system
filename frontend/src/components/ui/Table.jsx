function Table({
  columns = [],
  children,
}) {
  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map(
              (column) => (
                <th
                  key={column}
                  style={{
                    padding:
                      "12px",
                    textAlign:
                      "left",
                    borderBottom:
                      "2px solid var(--border-color)",
                    fontWeight:
                      "600",
                  }}
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;