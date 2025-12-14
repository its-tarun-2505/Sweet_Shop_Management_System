import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Login";
import Register from "../page/Register";
import Sweet from "../page/Sweet";
import AdminDashboard from "../page/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/layout/Layout";


const AppRoute = () => {
  return (
    // Layout wraps all routes (Navbar + main content)
    <Layout>
      <Routes>
        {/* Redirect root to sweets page */}
        <Route path="/" element={<Navigate to="/sweets" replace />} />

        {/* Public routes (accessible only when logged out) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes (any authenticated user) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/sweets" element={<Sweet />} />
        </Route>

        {/* Admin-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default AppRoute;
