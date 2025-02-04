import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getAllOrders } from "../../Slices/UserSlice";
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
import { orderColumn } from "../misc/model/order-column";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../Slices/AuthenSlice";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const { dataOrder, isOrderLoading } = useSelector((state) => state.user);
  const { isAuth, refreshToken } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [orders, setOrders] = useState(dataOrder?.orders || []);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 15,
    total: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const response = await dispatch(getAllOrders({
            page: pagination.page,
            limit: pagination.size
          })).unwrap();
          setOrders(response?.orders || []);
          setPagination(prev => ({
            ...prev,
            total: response?.total || 0
          }));        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchData();
  }, [dispatch, isAuth, refreshToken, pagination.page]);

  useEffect(() => {
    if (dataOrder?.orders) {
      setOrders(dataOrder?.orders || []);
    }
  }, [dataOrder]);

  useEffect(() => {
    if (searchQuery) {
      const filteredOrders = dataOrder?.orders?.filter((product) =>
        product.name.includes(searchQuery)
      );
      setOrders(filteredOrders || []);
    } else {
      setOrders(dataOrder?.orders || []);
    }
  }, [searchQuery, dataOrder]);
  

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
        const response = await dispatch(deleteProduct({ product_id: dataDelete._id })).unwrap();
        if (response.status === 'SUCCESS') {
          setOrders(orders.filter((product) => product._id !== dataDelete._id));
          closeDeleteModal(); // Close the modal after deleting
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/orders/new");
  };

  const handleSearch = (query) => {
    setSearchQuery(query.search);
  };

  const DeleteProductModal = () => (
    <Modal show={showDeleteModal} onHide={closeDeleteModal} className="mt-52">
      <Modal.Header closeButton>
        <Modal.Title>
          <p>
            Are you sure you want to delete this order from your account?
            <span className="text-success-s2"> "{dataDelete._id}"</span>?
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
              <Link to="/admin/dashboard" className="no-underline text-black">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/dashboard" className="no-underline text-black">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Order Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <TableActionProvider
          initialValues={{
            onDelete: displayDeleteModal,
            onEdit: (data) => {
              navigate(`/admin/orders/${data._id}`);
            }
          }}
        >
          {isOrderLoading ? (
            <SkeletonCard />
          ) : (
            <DataTable
              extra={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full h-full">
                  <Button onClick={handleClick}>
                    Add Order
                  </Button>
                  <SearchFilterCustom
                    setSearch={handleSearch}
                    searchPlaceholder="Search by name"
                  />
                </div>
              }
              isLoading={isOrderLoading}
              columns={orderColumn}
              data={orders || []}
            />
          )}
        </TableActionProvider>
      </PlaceholderContent>
      <DeleteProductModal />
    </ContentLayout>
  );
};

export default AdminOrderPage;
