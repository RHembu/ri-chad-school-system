import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import DateInput from "../components/ui/DateInput";

import Table from "../components/ui/Table";
import TableRow from "../components/ui/TableRow";
import TableCell from "../components/ui/TableCell";

const API_BASE_URL =
  "http://207.148.117.40:5001/api";

function AcademicYearsPage() {
  const [academicYears, setAcademicYears] =
    useState([]);

  const [yearName, setYearName] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem("token");

  async function loadAcademicYears() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_BASE_URL}/academic-years`,
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

      setAcademicYears(
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

  async function createAcademicYear(
    e
  ) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/academic-years`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              yearName,
              startDate,
              endDate,
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
        "Academic Year Created Successfully"
      );

      setYearName("");
      setStartDate("");
      setEndDate("");

      loadAcademicYears();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  async function activateYear(
    id
  ) {
    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/academic-years/${id}/activate`,
          {
            method: "PATCH",
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
        "Academic Year Activated Successfully"
      );

      loadAcademicYears();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  useEffect(() => {
    loadAcademicYears();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <PageHeader
        title="Academic Years"
      />

      {message && (
        <div
          style={{
            color:
              "var(--success-color)",
            marginBottom:
              "15px",
            fontWeight:
              "600",
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
            fontWeight:
              "600",
          }}
        >
          {error}
        </div>
      )}

      <Card>
        <form
          onSubmit={
            createAcademicYear
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
            placeholder="Academic Year"
            value={yearName}
            onChange={(e) =>
              setYearName(
                e.target.value
              )
            }
          />

          <DateInput
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
          />

          <DateInput
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
          />

          <Button type="submit">
            Create Academic Year
          </Button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            columns={[
              "ID",
              "Year",
              "Status",
              "Start Date",
              "End Date",
              "Action",
            ]}
          >
            {academicYears.map(
              (year) => (
                <TableRow
                  key={year.id}
                >
                  <TableCell>
                    {year.id}
                  </TableCell>

                  <TableCell>
                    {
                      year.year_name
                    }
                  </TableCell>

                  <TableCell>
                    {year.is_active ? (
                      <Badge type="success">
                        ACTIVE
                      </Badge>
                    ) : (
                      "INACTIVE"
                    )}
                  </TableCell>

                  <TableCell>
                    {year.start_date?.split(
                      "T"
                    )[0]}
                  </TableCell>

                  <TableCell>
                    {year.end_date?.split(
                      "T"
                    )[0]}
                  </TableCell>

                  <TableCell>
                    {year.is_active ? (
                      <span
                        style={{
                          color:
                            "var(--success-color)",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Current Active
                      </span>
                    ) : (
                      <Button
                        onClick={() =>
                          activateYear(
                            year.id
                          )
                        }
                      >
                        Activate
                      </Button>
                    )}
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

export default AcademicYearsPage;