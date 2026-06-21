import { useEffect, useState } from "react";

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);

  const [gradeLevelId, setGradeLevelId] = useState("");
  const [className, setClassName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const fetchGradeLevels = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/grade-levels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setGradeLevels(data.data);
      }
    } catch (error) {
      console.error("Fetch grade levels error:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Fetch classes error:", error);
    }
  };

  useEffect(() => {
    fetchGradeLevels();
    fetchClasses();
  }, []);

  const resetForm = () => {
    setGradeLevelId("");
    setClassName("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!gradeLevelId || !className) {
      setMessage("Please select grade level and enter class name.");
      return;
    }

    try {
      const url = editingId
        ? `${apiUrl}/api/classes/${editingId}`
        : `${apiUrl}/api/classes`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          grade_level_id: gradeLevelId,
          class_name: className,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setMessage(data.message);
      resetForm();
      fetchClasses();
    } catch (error) {
      console.error("Save class error:", error);
      setMessage("Server error while saving class.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setGradeLevelId(item.grade_level_id);
    setClassName(item.class_name);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${apiUrl}/api/classes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Could not delete class.");
        return;
      }

      setMessage(data.message);
      fetchClasses();
    } catch (error) {
      console.error("Delete class error:", error);
      setMessage("Server error while deleting class.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Classes Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3>{editingId ? "Update Class" : "Create Class"}</h3>

        <div style={{ marginBottom: "12px" }}>
          <label>Grade Level</label>
          <br />
          <select
            value={gradeLevelId}
            onChange={(e) => setGradeLevelId(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
          >
            <option value="">Select Grade Level</option>
            {gradeLevels.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.grade_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Class Name</label>
          <br />
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Example: Grade 1 A"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
          />
        </div>

        <button type="submit">
          {editingId ? "Update Class" : "Create Class"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}

        {message && (
          <p style={{ marginTop: "12px", color: "green" }}>{message}</p>
        )}
      </form>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Classes List</h3>

        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Grade Level</th>
              <th>Class Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="4" align="center">
                  No classes found.
                </td>
              </tr>
            ) : (
              classes.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.grade_name}</td>
                  <td>{item.class_name}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassesPage;