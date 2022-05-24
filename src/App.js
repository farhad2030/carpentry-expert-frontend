import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRequire from "./Authentication/AdminRequire";
import RequireAuth from "./Authentication/RequireAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNavBar from "./sheared/TopNavBar";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="dashboard" element={<Dashboard />}>
          <Route
            index
            element={
              <AdminRequire>
                <Dashboard />
              </AdminRequire>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
