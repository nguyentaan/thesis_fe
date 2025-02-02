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
} from "../ui/skeleton-card";
import { DataTable } from "../ui/data-table";
import { CustomDialog } from "../ui/custom-dialog";
import { SearchFilterCustom } from "../misc/search-filter-custom";
import { userColumns } from "../misc/model/user-column";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../Slices/AuthenSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { dataUser, isUserLoading } = useSelector((state) => state.user);
  const { isAuth, refreshToken } = useSelector((state) => state.auth);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [users, setUsers] = useState(dataUser?.users || []); // Local state for users

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const response = await dispatch(getAllUser()).unwrap();
          setUsers(response?.data || []);
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
      setUsers(dataUser?.users || []);
    }
  }, [dataUser]);

  useEffect(() => {
    if (searchQuery) {
      const filterUsers = dataUser?.users?.filter((user) =>
        user.email.includes(searchQuery)
      );
      setUsers(filterUsers || []);
    } else {
      setUsers(dataUser?.users || []);
    }
  }, [searchQuery, dataUser]);

  const displayDeleteModal = (data) => {
    setDataDelete(data);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (dataDelete._id) {
      try {
        const response = await dispatch(deleteUser({ user_id: dataDelete._id })).unwrap();
        console.log("Response delete user:", response);
        if (response.status === 'SUCCESS') {
          setUsers(users.filter((user) => user._id !== dataDelete._id));
          closeDeleteModal(); // Close the modal after deleting
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.search);
  };


  const DeleteuserModal = () => (
    <Modal show={showDeleteModal} onHide={closeDeleteModal} className="mt-52">
      <Modal.Header closeButton>
        <Modal.Title>
          <p>
            Are you sure you want to delete the user
            <span className="text-success-s2"> "{dataDelete.name}"</span>? with User ID: {dataDelete._id}
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/users/new");
  };

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
            onDelete: displayDeleteModal, // Update to call displayDeleteModal
            onEdit: (data) => {
              navigate(`/admin/users/${data._id}`);
            }
          }}
        >
          {isUserLoading ? (
            <SkeletonCard />
          ) : (
            <DataTable
              extra={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full h-full">
                  <Button onClick={handleClick}>
                    Add User
                  </Button>
                  <SearchFilterCustom
                    setSearch={handleSearch}
                    searchPlaceholder="Search by name"
                  />
                </div>
              }
              isLoading={isUserLoading}
              columns={userColumns}
              data={users} // Use local users state for table data
            />
          )}
        </TableActionProvider>
      </PlaceholderContent>

      {/* Delete Modal */}
      <DeleteuserModal />
    </ContentLayout>
  );
};

export default AdminUsers;
