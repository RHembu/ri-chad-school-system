import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

function SchoolSettingsPage() {
  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <PageHeader
        title="School Settings"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <Card>
          <h3>
            Academic Years
          </h3>

          <p>
            Manage academic years.
          </p>
        </Card>

        <Card>
          <h3>
            Academic Periods
          </h3>

          <p>
            Manage terms and semesters.
          </p>
        </Card>

        <Card>
          <h3>
            School Profile
          </h3>

          <p>
            Manage school information.
          </p>
        </Card>

        <Card>
          <h3>
            Branding
          </h3>

          <p>
            Manage logo and branding.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default SchoolSettingsPage;