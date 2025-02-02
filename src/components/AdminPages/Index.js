import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./AdminLogin";
import AdminDashboard from "./Dashboard";
import AdminProductPage from "./AdminProduct";
import AdminUsersPage from "./AdminUsers";
import AdminLayout from "./AdminLayout";
import AdminFileUpload from "./AdminFileUpload";
import AdminEmbeddingPage from "./AdminEmbedding";
import AdminUserAdd from "./AdminUsersAdd";
import AdminProductAdd from "./AdminProductAdd";
import AdminUserDetail from "./AdminUsersDetail";
import AdminProductDetail from "./AdminProductDetail";
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
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/products/new"
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                <AdminProductAdd />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path={`/products/:product_id`}
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                <AdminProductDetail />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
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
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path={`/users/:user_id`}
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                <AdminUserDetail />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/users/new"
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                <AdminUserAdd />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
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
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/embedding"
          element={
            isAuth && user?.data?.isAdmin ? (
              <AdminLayout>
                <AdminEmbeddingPage />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Index;
