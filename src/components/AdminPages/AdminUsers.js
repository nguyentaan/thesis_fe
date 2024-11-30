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

const AdminUsers = () => {
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
    <ContentLayout title="User management">
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
            <BreadcrumbPage>User management</BreadcrumbPage>
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
    // <div className="text-center container">
    //   {isUserLoading ? (
    //     <Loader />
    //   ) : (
    //     <Table className="table table-success">
    //       <Thead>
    //         <Tr>
    //           <Th>#</Th>
    //           <Th>Name</Th>
    //           <Th>Email</Th>
    //           <Th>Phone Number</Th>
    //           <Th>Total Order</Th>
    //           <Th>
    //             <i className="far fa-trash-alt fa-lg"></i>
    //           </Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {dataUser?.users?.map((item, index) => (
    //           <Tr key={item.email}>
    //             <Td className="text-justify text-center">
    //               <img
    //                 src={item?.avatar || "https://gravatar.com/avatar/681924887c514c786b5f3fe4e1e1695b?s=400&d=robohash&r=x"}
    //                 alt={"avatar"}
    //                 className="h-40 w-40"
    //               />
    //             </Td>
    //             <Td className="text-justify text-center">{item?.name}</Td>
    //             <Td className="text-justify text-center">{item?.email}</Td>
    //             <Td className="text-justify text-center">0{item?.phone}</Td>
    //             <Td className="text-justify text-center">{item?.order_lists.length}</Td>

    //             <Td>
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => displayDeleteModal(item)}
    //               >
    //                 <i className="far fa-trash-alt fa-lg"></i>
    //               </button>
    //             </Td>
    //           </Tr>
    //         ))}
    //       </Tbody>
    //     </Table>
    //   )}
    //   <DeleteProductModal />
    // </div>
  );
};

export default AdminUsers;
