import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f5f7fb",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MainLayout;