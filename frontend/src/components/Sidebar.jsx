import {
  Link,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate =
    useNavigate();

  const logout =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate(
        "/login"
      );
    };

  return (
    <div
      style={{
        width: "250px",
        background:
          "#0f172a",
        color: "#fff",
        padding: "20px",
        minHeight:
          "100vh",
      }}
    >
      <h2
        style={{
          marginBottom:
            "30px",
        }}
      >
        Ri-Chad SMS
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "12px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "#fff",
            textDecoration:
              "none",
            fontWeight:
              "600",
          }}
        >
          Dashboard
        </Link>

        <div
          style={{
            marginTop:
              "15px",
          }}
        >
          <div
            style={{
              fontSize:
                "13px",
              color:
                "#94a3b8",
              marginBottom:
                "10px",
              textTransform:
                "uppercase",
              fontWeight:
                "bold",
            }}
          >
            Academic Structure
          </div>

          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              gap: "10px",
              paddingLeft:
                "10px",
            }}
          >
            <Link
              to="/school-settings"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Overview
            </Link>

            <Link
              to="/academic-years"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Academic Years
            </Link>

            <Link
              to="/academic-periods"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Academic Periods
            </Link>

            <Link
              to="/grade-levels"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Grade Levels
            </Link>

            <Link
              to="/classes"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Classes
            </Link>

            <Link
              to="/streams"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Streams
            </Link>

            <Link
              to="/school-profile"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              School Profile
            </Link>

            <Link
              to="/branding"
              style={{
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Branding
            </Link>
          </div>
        </div>

        <button
          onClick={
            logout
          }
          style={{
            marginTop:
              "30px",
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;