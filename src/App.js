import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminRequire from "./Authentication/AdminRequire";
import RequireAuth from "./Authentication/RequireAuth";
import AddProduct from "./pages/Dashboard/AddProduct";
import AllUsers from "./pages/Dashboard/AllUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import MyOrders from "./pages/Dashboard/MyOrders";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Purchase from "./pages/Purchase";
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
        <Route
          path="purchase"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route path="dashboard" element={<Dashboard />}>
          <Route
            index
            path="myOrders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route
            path="myOrders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />

          <Route
            path="allUsers"
            element={
              <AdminRequire>
                <AllUsers />
              </AdminRequire>
            }
          />
          <Route
            path="manageProducts"
            element={
              <AdminRequire>
                <ManageProducts />
              </AdminRequire>
            }
          />
          <Route
            path="addProducts"
            element={
              <AdminRequire>
                <AddProduct />
              </AdminRequire>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
