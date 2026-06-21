import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";

const API_BASE_URL =
  "http://207.148.117.40:5001/api";

function ClassesPage() {
  const [classes, setClasses] =
    useState([]);

  const [className, setClassName] =
    useState("");

  const [classLevel, setClassLevel] =
    useState("");

  const [classType, setClassType] =
    useState("PRIMARY");

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

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      setClasses(
        data.data || []
      );
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  async function createClass(
    e
  ) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/classes`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              class_name:
                className,
              class_level:
                classLevel,
              class_type:
                classType,
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
        "Class Created Successfully"
      );

      setClassName("");
      setClassLevel("");

      loadClasses();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <PageHeader
        title="Classes"
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
            createClass
          }
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom:
              "20px",
          }}
        >
          <Input
            placeholder="Class Name"
            value={className}
            onChange={(e) =>
              setClassName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Class Level"
            value={classLevel}
            onChange={(e) =>
              setClassLevel(
                e.target.value
              )
            }
          />

          <Select
            value={classType}
            onChange={(e) =>
              setClassType(
                e.target.value
              )
            }
            options={[
              {
                value:
                  "PRIMARY",
                label:
                  "PRIMARY",
              },
              {
                value:
                  "SECONDARY",
                label:
                  "SECONDARY",
              },
              {
                value:
                  "COLLEGE",
                label:
                  "COLLEGE",
              },
              {
                value:
                  "VOCATIONAL",
                label:
                  "VOCATIONAL",
              },
            ]}
          />

          <Button type="submit">
            Create Class
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
              <th>Name</th>
              <th>Level</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {classes.map(
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
                      item.class_level
                    }
                  </td>

                  <td>
                    {
                      item.class_type
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

export default ClassesPage;