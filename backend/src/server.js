const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const schoolRoutes =
  require("./routes/schoolRoutes");

const testRoleRoutes =
  require("./routes/testRoleRoutes");

const testTenantRoutes =
  require("./routes/testTenantRoutes");

const authRoutes =
  require("./routes/authRoutes");

const testDemoRoutes =
  require("./routes/testDemoRoutes");

const academicYearRoutes =
  require("./routes/academicYearRoutes");

const academicPeriodRoutes =
  require("./routes/academicPeriodRoutes");

const classRoutes =
  require("./routes/classRoutes");

const streamRoutes =
  require("./routes/streamRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Ri-Chad Backend Running",
  });
});

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Backend API Healthy",
    });
  }
);

/*
|--------------------------------------------------------------------------
| Test Routes
|--------------------------------------------------------------------------
*/
app.use(
  "/api/test-tenant",
  testTenantRoutes
);

app.use(
  "/api/test-role",
  testRoleRoutes
);

app.use(
  "/api/test-demo",
  testDemoRoutes
);

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/
app.use(
  "/api/auth",
  authRoutes
);

/*
|--------------------------------------------------------------------------
| Schools
|--------------------------------------------------------------------------
*/
app.use(
  "/api/schools",
  schoolRoutes
);

/*
|--------------------------------------------------------------------------
| Academic Years
|--------------------------------------------------------------------------
*/
app.use(
  "/api/academic-years",
  academicYearRoutes
);

/*
|--------------------------------------------------------------------------
| Academic Periods
|--------------------------------------------------------------------------
*/
app.use(
  "/api/academic-periods",
  academicPeriodRoutes
);

/*
|--------------------------------------------------------------------------
| Classes
|--------------------------------------------------------------------------
*/
app.use(
  "/api/classes",
  classRoutes
);

/*
|--------------------------------------------------------------------------
| Streams
|--------------------------------------------------------------------------
*/
app.use(
  "/api/streams",
  streamRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});