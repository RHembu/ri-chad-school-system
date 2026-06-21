import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";

const API_BASE_URL =
  "http://207.148.117.40:5001/api";

function StreamsPage() {
  const [streams, setStreams] =
    useState([]);

  const [classes, setClasses] =
    useState([]);

  const [classId, setClassId] =
    useState("");

  const [streamName, setStreamName] =
    useState("");

  const [streamCode, setStreamCode] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem("token");

  async function loadClasses() {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/classes`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        setClasses(
          data.data || []
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadStreams() {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/streams`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      setStreams(
        data.data || []
      );
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  async function createStream(
    e
  ) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/streams`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              class_id:
                classId,
              stream_name:
                streamName,
              stream_code:
                streamCode,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      setMessage(
        "Stream Created Successfully"
      );

      setClassId("");
      setStreamName("");
      setStreamCode("");

      loadStreams();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  useEffect(() => {
    loadClasses();
    loadStreams();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <PageHeader
        title="Streams"
      />

      {message && (
        <div
          style={{
            color:
              "var(--success-color)",
            marginBottom:
              "15px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            color:
              "var(--danger-color)",
            marginBottom:
              "15px",
          }}
        >
          {error}
        </div>
      )}

      <Card>
        <form
          onSubmit={
            createStream
          }
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom:
              "20px",
          }}
        >
          <Select
            value={classId}
            onChange={(e) =>
              setClassId(
                e.target.value
              )
            }
            options={[
              {
                value: "",
                label:
                  "Select Class",
              },
              ...classes.map(
                (item) => ({
                  value:
                    item.id,
                  label:
                    item.class_name,
                })
              ),
            ]}
          />

          <Input
            placeholder="Stream Name"
            value={streamName}
            onChange={(e) =>
              setStreamName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Stream Code"
            value={streamCode}
            onChange={(e) =>
              setStreamCode(
                e.target.value
              )
            }
          />

          <Button type="submit">
            Create Stream
          </Button>
        </form>

        <table
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Class</th>
              <th>Stream</th>
              <th>Code</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {streams.map(
              (item) => (
                <tr
                  key={
                    item.id
                  }
                >
                  <td>
                    {item.id}
                  </td>

                  <td>
                    {
                      item.class_name
                    }
                  </td>

                  <td>
                    {
                      item.stream_name
                    }
                  </td>

                  <td>
                    {
                      item.stream_code
                    }
                  </td>

                  <td>
                    <Badge type="success">
                      {
                        item.status
                      }
                    </Badge>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default StreamsPage;