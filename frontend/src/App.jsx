import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import AcademicYearsPage from "./pages/AcademicYearsPage";
import SchoolSettingsPage from "./pages/SchoolSettingsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const token =
    localStorage.getItem(
      "token"
    );

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/*"
          element={
            token ? (
              <MainLayout>
                <Routes>

                  <Route
                    path="/dashboard"
                    element={
                      <DashboardPage />
                    }
                  />

                  <Route
                    path="/school-settings"
                    element={
                      <SchoolSettingsPage />
                    }
                  />

                  <Route
                    path="/academic-years"
                    element={
                      <AcademicYearsPage />
                    }
                  />

                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/dashboard"
                      />
                    }
                  />

                </Routes>
              </MainLayout>
            ) : (
              <Navigate
                to="/login"
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;