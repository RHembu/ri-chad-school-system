import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import DateInput from "../components/ui/DateInput";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";

const API_BASE_URL =
  "http://207.148.117.40:5001/api";

function AcademicPeriodsPage() {
  const [academicYears, setAcademicYears] =
    useState([]);

  const [periods, setPeriods] =
    useState([]);

  const [academicYearId, setAcademicYearId] =
    useState("");

  const [periodName, setPeriodName] =
    useState("");

  const [periodType, setPeriodType] =
    useState("TERM");

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

      if (response.ok) {
        setAcademicYears(
          data.data || []
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadPeriods() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_BASE_URL}/academic-periods`,
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

      setPeriods(
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

  async function createPeriod(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const response =
        await fetch(
          `${API_BASE_URL}/academic-periods`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              academicYearId,
              periodName,
              periodType,
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
        "Academic Period Created Successfully"
      );

      setAcademicYearId("");
      setPeriodName("");
      setStartDate("");
      setEndDate("");

      loadPeriods();
    } catch (err) {
      setError(
        err.message
      );
    }
  }

  useEffect(() => {
    loadAcademicYears();
    loadPeriods();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <PageHeader
        title="Academic Periods"
      />

      {message && (
        <div
          style={{
            color:
              "var(--success-color)",
            marginBottom: "15px",
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
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      <Card>
        <form
          onSubmit={createPeriod}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <Select
            value={academicYearId}
            onChange={(e) =>
              setAcademicYearId(
                e.target.value
              )
            }
            options={[
              {
                value: "",
                label:
                  "Select Academic Year",
              },
              ...academicYears.map(
                (year) => ({
                  value: year.id,
                  label:
                    year.year_name,
                })
              ),
            ]}
          />

          <Input
            placeholder="Period Name"
            value={periodName}
            onChange={(e) =>
              setPeriodName(
                e.target.value
              )
            }
          />

          <Select
            value={periodType}
            onChange={(e) =>
              setPeriodType(
                e.target.value
              )
            }
            options={[
              {
                value: "TERM",
                label: "TERM",
              },
              {
                value: "SEMESTER",
                label:
                  "SEMESTER",
              },
            ]}
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
            Create Period
          </Button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              overflowX:
                "auto",
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
                  <th>Year</th>
                  <th>Period</th>
                  <th>Type</th>
                  <th>Order</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {periods.map(
                  (period) => (
                    <tr
                      key={
                        period.id
                      }
                    >
                      <td>
                        {
                          period.year_name
                        }
                      </td>

                      <td>
                        {
                          period.period_name
                        }
                      </td>

                      <td>
                        {
                          period.period_type
                        }
                      </td>

                      <td>
                        {
                          period.period_order
                        }
                      </td>

                      <td>
                        <Badge type="success">
                          {
                            period.status
                          }
                        </Badge>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default AcademicPeriodsPage;