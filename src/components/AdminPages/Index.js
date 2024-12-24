import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./AdminLogin";
import AdminDashboard from "./Dashboard";
import AdminProductPage from "./AdminProduct";
import AdminUsersPage from "./AdminUsers";
import AdminLayout from "./AdminLayout";
import AdminFileUpload from "./AdminFileUpload";

const Index = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            isAuth && user?.data?.isAdmin ? (
                <AdminLayout>
                  <AdminProductPage />
                </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuth && user?.data?.isAdmin ? (
                <AdminLayout>
                  <AdminUsersPage />
                </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/files"
          element={
            isAuth && user?.data?.isAdmin ? (
                <AdminLayout>
                  <AdminFileUpload />
                </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Index;
