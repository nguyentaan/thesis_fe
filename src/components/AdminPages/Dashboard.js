import React from "react";
import Chart from "../../assets/chart.jpg";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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

const Dashboard = () => {
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
        <div className="text-center">
          <img src={Chart} alt="..." className="w-75" />
          This is the data today.
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
};
export default Dashboard;
