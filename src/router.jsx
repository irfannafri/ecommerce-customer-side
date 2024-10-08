import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import TopUp from "./components/TopUp.jsx";
import { useSelector } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary"
// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "topup",
        element: <TopUp />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
