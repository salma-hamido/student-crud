import React from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Students from "./pages/students";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/login";
import AdminLayout from "./components/Layout/AdminLayout";
import Loading from "./components/loading";
import { Toaster } from "react-hot-toast";


export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();


  if (loading) {
    return <Loading />
  }

  return isAuthenticated ? <AdminLayout><Outlet /></AdminLayout> : <Navigate to="/login" replace />;
};


export default function App() {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Toaster />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/students" element={<Students />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

