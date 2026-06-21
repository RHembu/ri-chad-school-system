import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import TableRow from "../components/ui/TableRow";
import TableCell from "../components/ui/TableCell";

const API_BASE_URL =
  "http://207.148.117.40:5001/api";

function GradeLevelsPage() {
  const [gradeLevels, setGradeLevels] =
    useState([]);

  const [gradeName, setGradeName] =
    useState("");

  const [gradeOrder, setGradeOrder] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem("token");

  async function loadGradeLevels() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_BASE_URL}/grade-levels`,
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

      setGradeLevels(
        data.data || []
      );
    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function createGradeLevel(
    e
  ) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/grade-levels`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              gradeName,
              gradeOrder,
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
        "Grade Level Created Successfully"
      );

      setGradeName("");
      setGradeOrder("");

      loadGradeLevels();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  async function deleteGradeLevel(
    id
  ) {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/grade-levels/${id}`,
          {
            method: "DELETE",
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

      setMessage(
        "Grade Level Deleted Successfully"
      );

      loadGradeLevels();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  useEffect(() => {
    loadGradeLevels();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <PageHeader
        title="Grade Levels"
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
            createGradeLevel
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
            placeholder="Grade Name"
            value={gradeName}
            onChange={(e) =>
              setGradeName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Grade Order"
            type="number"
            value={gradeOrder}
            onChange={(e) =>
              setGradeOrder(
                e.target.value
              )
            }
          />

          <Button type="submit">
            Create Grade Level
          </Button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            columns={[
              "ID",
              "Grade Name",
              "Order",
              "Action",
            ]}
          >
            {gradeLevels.map(
              (grade) => (
                <TableRow
                  key={grade.id}
                >
                  <TableCell>
                    {grade.id}
                  </TableCell>

                  <TableCell>
                    {
                      grade.grade_name
                    }
                  </TableCell>

                  <TableCell>
                    {
                      grade.grade_order
                    }
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() =>
                        deleteGradeLevel(
                          grade.id
                        )
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </Table>
        )}
      </Card>
    </div>
  );
}

export default GradeLevelsPage;