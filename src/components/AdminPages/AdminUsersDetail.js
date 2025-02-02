import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form, Card } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getOneUser } from "../../Slices/UserSlice";
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
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Slices/AuthenSlice";
import { useParams } from 'react-router-dom';
import { SkeletonCard } from "../ui/skeleton-card";

const AdminUserDetail = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const { dataUser, isUserLoading } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({}); // State to hold the user details
  const [isFormUpdated, setIsFormUpdated] = useState(false);

  // Fetch the user details when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth && user_id) {
          const response = await dispatch(getOneUser(user_id)).unwrap();
          setUserDetails(response?.data || {});
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [dispatch, isAuth, user_id]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    setIsFormUpdated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormUpdated) {
      const { name, email, phone } = userDetails;
      const response = await dispatch(updateUser({ user_id, update_data: { name, email, phoneNumber: phone } })).unwrap();
      console.log("Response:", response);
      if (response) {
        alert("User updated successfully");
        setIsFormUpdated(false);
      }
    }
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
        {isUserLoading ? (
          <SkeletonCard />
        ) : (
          <Card className="mb-3 border-none outline-none">
            <Card.Body>
              <h5>User Information</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userDetails?.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userDetails?.email || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={userDetails?.isAdmin ? "Admin" : "User"} // Read only field for Role
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userDetails?.phone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Order Lists</Form.Label>
                  <Form.Control
                    type="text"
                    value={userDetails?.order_lists || "0"} // Read only
                    readOnly
                  />
                </Form.Group>

                {/* Add the update button */}
                <Button type="submit" variant="primary" disabled={!isFormUpdated}>
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminUserDetail;
