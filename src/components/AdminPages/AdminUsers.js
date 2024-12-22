import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getAllUser } from "../../Slices/UserSlice";
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
import {SearchFilterCustom} from "../misc/search-filter-custom";
import {userColumns} from "../misc/model/user-column";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const { dataUser, isUserLoading } = useSelector((state) => state.user);
  const { isAuth, refreshToken } = useSelector((state) => state.auth);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const response = await dispatch(getAllUser()).unwrap();
          console.log("Response get user:", dataUser);  // Log the response here
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
    <ContentLayout title="User Management">
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
            <BreadcrumbPage>User Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <TableActionProvider
          initialValues={{
            // onEdit: handleEdit,
            // setSorting,
            // onDelete: handleDelete,
          }}
        >
          {isUserLoading ? (
            <SkeletonCard />
          ) : (
            <DataTable
              extra={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full h-full">
                  <CustomDialog
                    button={<Button>Add User</Button>}
                    title="New Campaign"
                    noFooter
                  >
                    {({ close }) => (
                      <div>
                        Ongoing
                      </div>
                    )}
                  </CustomDialog>
                  <SearchFilterCustom
                    // search={search.filter}
                    // setSearch={setSearch}
                    searchPlaceholder="Search by name"
                  />
                </div>
              }
              isLoading={isUserLoading}
              columns={userColumns}
              data={dataUser?.users || []}
              // pagination={{
              //   ...pagination,
              //   total: data?.total ?? 0,
              // }}
            />
          )}
        </TableActionProvider>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminUsers;
