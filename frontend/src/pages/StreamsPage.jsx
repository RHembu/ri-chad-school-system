import { useEffect, useState } from "react";

function StreamsPage() {
  const [streams, setStreams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [streamName, setStreamName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/classes", {
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

  const fetchStreams = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/streams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setStreams(data.data);
      }
    } catch (error) {
      console.error("Fetch streams error:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchStreams();
  }, []);

  const resetForm = () => {
    setClassId("");
    setStreamName("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5001/api/streams/${editingId}`
      : "http://localhost:5001/api/streams";

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          class_id: classId,
          stream_name: streamName,
        }),
      });

      const data = await res.json();

      setMessage(data.message);

      if (data.success) {
        resetForm();
        fetchStreams();
      }
    } catch (error) {
      console.error("Save stream error:", error);
      setMessage("Something went wrong");
    }
  };

  const handleEdit = (stream) => {
    setEditingId(stream.id);
    setClassId(stream.class_id);
    setStreamName(stream.stream_name);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stream?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/api/streams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setMessage(data.message);

      if (data.success) {
        fetchStreams();
      }
    } catch (error) {
      console.error("Delete stream error:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Streams Management</h1>

      {message && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          display: "grid",
          gap: "12px",
          maxWidth: "500px",
        }}
      >
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          required
          style={{ padding: "10px" }}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.class_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Stream Name e.g. A, B, Science, Commerce"
          value={streamName}
          onChange={(e) => setStreamName(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <button type="submit" style={{ padding: "10px" }}>
          {editingId ? "Update Stream" : "Create Stream"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} style={{ padding: "10px" }}>
            Cancel Edit
          </button>
        )}
      </form>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Class</th>
            <th>Stream Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {streams.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No streams found
              </td>
            </tr>
          ) : (
            streams.map((stream, index) => (
              <tr key={stream.id}>
                <td>{index + 1}</td>
                <td>{stream.class_name}</td>
                <td>{stream.stream_name}</td>
                <td>
                  <button onClick={() => handleEdit(stream)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(stream.id)}
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
  );
}

export default StreamsPage;