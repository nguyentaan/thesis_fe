import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getAllFile } from "../../Slices/UserSlice";
import ContentLayout from "../admin-panel/content-layout";
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
import { TableActionProvider } from "../../providers/table-action-provider";
import {
  SkeletonCard
} from "../ui/skeleton-card"
import { DataTable } from "../ui/data-table";
import { CustomDialog } from "../ui/custom-dialog";
import { SearchFilterCustom } from "../misc/search-filter-custom";
import { fileColumn } from "../misc/model/file-column";
import SingleFileUploader from "../ui/upload_form";
const AdminFileUpload = () => {
  const dispatch = useDispatch();
  const { dataFileUpload, isFileLoading } = useSelector((state) => state.user);
  const { isAuth, refreshToken } = useSelector((state) => state.auth);

  const [showSuccessToast, setShowSuccessToast] = useState(false); // state for showing success toast
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});


  useEffect(() => {
    if (isAuth) {
      dispatch(getAllFile({}));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && dataFileUpload?.files) {
      console.log("Updated File List: ", dataFileUpload);
    }
  }, [dataFileUpload]);


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

  const handleUploadSuccess = () => {
    setShowSuccessToast(true); // Show success toast
    dispatch(getAllFile({}));
    setTimeout(() => {
      setShowSuccessToast(false); // Hide toast after a few seconds
    }, 3000);
  };

  const DeleteProductModal = () => (
    <Modal show={showDeleteModal} onHide={closeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p>
            Are you sure you want to delete this file
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

  const setSearch = () => {
    // Add search logic here
  };

  return (
    <ContentLayout title="File Management">
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
            <BreadcrumbPage>FIle Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <TableActionProvider
          initialValues={{
          }}
        >
          {isFileLoading ? (
            <SkeletonCard />
          ) : (
            <DataTable
              extra={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full h-full">
                  <CustomDialog
                    button={<Button>Add File</Button>}
                    noFooter
                    title="Add File Form"
                  >
                    {({ close }) => (
                      <SingleFileUploader onUploadSuccess={handleUploadSuccess} />
                    )}
                  </CustomDialog>
                  <SearchFilterCustom
                    // search={search.filter}
                    setSearch={setSearch}
                    searchPlaceholder="Search by name"
                  />
                </div>
              }
              isLoading={isFileLoading}
              columns={fileColumn}
              data={dataFileUpload?.files || []}
            />
          )}
        </TableActionProvider>
      </PlaceholderContent>
      {showSuccessToast && (
        <div className="toast toast-success">
          File uploaded successfully!
        </div>
      )}
    </ContentLayout>
  );
};

export default AdminFileUpload;
