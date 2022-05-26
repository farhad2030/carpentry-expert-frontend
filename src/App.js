import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminRequire from "./Authentication/AdminRequire";
import RequireAuth from "./Authentication/RequireAuth";
import Blog from "./pages/Blog";
import AddProduct from "./pages/Dashboard/AddProduct";
import AddReview from "./pages/Dashboard/AddReview";
import AllUsers from "./pages/Dashboard/AllUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import MakePayment from "./pages/Dashboard/MakePayment";
import ManageOrder from "./pages/Dashboard/ManageOrder";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import MyOrders from "./pages/Dashboard/MyOrders";
import MyProfile from "./pages/Dashboard/MyProfile";
import Footer from "./pages/Footer";
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
        <Route
          path="purchase/:editPurchase"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route
          path="makePayment/:orderId"
          element={
            <RequireAuth>
              <MakePayment />
            </RequireAuth>
          }
        />
        <Route path="dashboard" element={<Dashboard />}>
          <Route
            index
            element={
              <RequireAuth>
                <MyProfile />
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
            path="addReview"
            element={
              <RequireAuth>
                <AddReview />
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
            path="manageOrder"
            element={
              <AdminRequire>
                <ManageOrder />
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
        <Route path="blog" element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
