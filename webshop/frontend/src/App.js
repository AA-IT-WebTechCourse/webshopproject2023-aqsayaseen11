import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/shop";
import Inventory from "./pages/myproducts";
import Account from "./pages/account";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { UserProvider } from "./utils/UserContext";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AddProduct from "./pages/addProduct";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="container mx-auto text-white">
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Router>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route
                path="/myitems"
                element={
                  <AuthenticatedRoute>
                    <Inventory />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/myitems/add-product"
                element={
                  <AuthenticatedRoute>
                    <AddProduct />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/myitems/add-product/:productId"
                element={
                  <AuthenticatedRoute>
                    <AddProduct />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <AuthenticatedRoute>
                    <Account />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <UnauthenticatedRoute>
                    <Login />
                  </UnauthenticatedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <UnauthenticatedRoute>
                    <SignUp />
                  </UnauthenticatedRoute>
                }
              />
              <Route path="/" element={<Shop />} />
            </Routes>
          </UserProvider>
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
