import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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
import { Button, Card, Accordion } from "react-bootstrap";
import { SkeletonCard } from "../ui/skeleton-card";
import { dashboardData } from "../../Slices/AuthenSlice";

const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState([]);
  console.log("dashboard isAuth", isAuth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const response = await dispatch(dashboardData()).unwrap();
          setDashboard(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [dispatch, isAuth]);

  const cardList = [
    {
      title: "Total Products",
      content: dashboard?.productCount,
      icons: "fa fa-shopping-cart",
      href: "/admin/products",
    },
    {
      title: "Total Users",
      content: dashboard?.userCount,
      icons: "fa fa-users",
      href: "/admin/users",
    },
    {
      title: "Total Orders",
      content: dashboard?.orderCount,
      icons: "fa fa-shopping-cart",
      href: "#",
    },
    {
      title: "Total File Uploads",
      content: dashboard?.fileUploadCount,
      icons: "fa fa-file",
      href: "/admin/files",
    },
    {
      title: "Total Uncategorized Products",
      content: dashboard?.uncategorizedProducts,
      icons: "fa fa-question-circle",
      href: "/admin/products",
    },
    {
      title: "Total Products Embeded",
      content: dashboard?.embeddedProducts,
      icons: "fa fa-code",
      href: "/admin/embedding",
    }
  ];

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/dashboard" className="no-underline text-black">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlaceholderContent>
        {isAuth ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cardList.map((card, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <Card.Body className="flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h5>{card.title}</h5>
                    <i className={card.icons}></i>
                  </div>
                  <p>{card.content}</p>
                  <Button variant="primary" className="w-fit">
                    <Link to={card.href} className="no-underline text-white">View</Link>
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <SkeletonCard />
        )}
      </PlaceholderContent>

      {/* FAQ Section */}
      <div className="mt-5">
        <h2>Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Do I need to purchase anything to use?</Accordion.Header>
            <Accordion.Body>
              No
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What requirement to use our website?</Accordion.Header>
            <Accordion.Body>
              A device that connects to the internet.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </ContentLayout>
  );
};

export default Dashboard;
