import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getAllUser } from "../../Slices/UserSlice";
import ContentLayout  from "../admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import PlaceholderContent from "../misc/placeholder-content";

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const { dataUser, isUserLoading } = useSelector((state) => state.user);
  const { isAuth, refreshToken } = useSelector((state) => state.auth);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth && refreshToken) {
          const response = await dispatch(getAllUser()).unwrap();
          console.log("Response get user:", response);  // Log the response here
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [dispatch, isAuth, refreshToken]);

  useEffect(() => {
    if (dataUser?.users) {
      console.log("User data updated: ", dataUser);
    }
  }, [dataUser])

  const displayDeleteModal = (data) => {
    setDataDelete(data);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    // Add delete logic here (e.g., dispatching deleteUser action)
    setShowDeleteModal(false);
  };

  const DeleteProductModal = () => (
    <Modal show={showDeleteModal} onHide={closeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p>
            Are you sure you want to delete the user
            <span className="text-success-s2"> "{dataDelete.username}"</span>?
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeDeleteModal}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <ContentLayout title="Product Management">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/dashboard" className="no-underline text-black">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/dashboard" className="no-underline text-black">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        {/* <DataTable
          columns={hotspotColumns}
          data={logData?.data ?? []}
          pagination={logData?.pagination ?? { pageIndex: 0, pageSize: 10 }}
          pageCount={logData?.pageCount ?? 0}
        /> */}
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminProductPage;
