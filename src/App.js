import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRequire from "./Authentication/AdminRequire";
import RequireAuth from "./Authentication/RequireAuth";
import AllUsers from "./pages/Dashboard/AllUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders";
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
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route
            path="allUsers"
            element={
              <AllUsers>
                <Login />
              </AllUsers>
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
