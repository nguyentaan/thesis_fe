import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Card } from "react-bootstrap";
import { updateProduct } from "../../Slices/AuthenSlice";
import { getOneProduct } from "../../Slices/UserSlice";
import ContentLayout from "../admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import PlaceholderContent from "../misc/placeholder-content";
import { SkeletonCard } from "../ui/skeleton-card";
import axios from "axios";

const AdminProductDetail = () => {
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const { isAuth } = useSelector((state) => state.auth);

  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth && product_id) {
          const response = await dispatch(getOneProduct(product_id)).unwrap();
          setProductDetail(response || {});
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [dispatch, isAuth, product_id]);

  const handleChange = (e) => {
    setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value,
    });
    setIsFormUpdated(true);
  };

  const handleImageClick = () => {
    setIsEditingImage(true);
  };

  const handleImageClickBack = () => {
    setIsEditingImage(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "product_imgs");

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
      if (response.data.secure_url) {
        setProductDetail((prev) => ({ ...prev, image_url: response.data.secure_url }));
        setIsFormUpdated(true);
        setIsEditingImage(false);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormUpdated) {
      const response = await dispatch(updateProduct({ product_id, update_data: productDetail })).unwrap();
      if (response) {
        alert("Product updated successfully");
        setIsFormUpdated(false);
      }
    }
  };

  return (
    <ContentLayout title="Product Management">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/dashboard">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Product Management</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        {isAuth ? (
          <Card className="mb-3">
            <Card.Body>
              <h5>Product Information</h5>
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={productDetail?.name || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={productDetail?.price || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="product_code"
                        value={productDetail?.product_code || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="product_code"
                        value={productDetail?.description || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="mb-3 hover:cursor-pointer">
                    {isEditingImage ? (
                      <div className="flex flex-col gap-3">
                        <Form.Control type="text" name="image_url" value={productDetail.image_url || ""} onChange={handleChange} />
                        <input type="file" onChange={handleFileChange} />
                        <Button onClick={handleUpload} disabled={isUploading}>{isUploading ? "Uploading..." : "Upload"}</Button>
                        <Button onClick={handleImageClickBack}> View Image </Button>
                      </div>
                    ) : (
                      <img
                        src={productDetail?.image_url || "placeholder.jpg"}
                        alt={productDetail?.name || "Product Image"}
                        style={{ width: "100%", height: "350px", objectFit: "fill", borderRadius: "10px", border: "1px solid #ccc" }}
                        onClick={handleImageClick}
                        className="hover:shadow-md duration-300"
                      />
                    )}
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Total Rating</Form.Label>
                  <Form.Control
                    type="text"
                    name="total_rating"
                    value={productDetail?.total_rating || "0"}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sold Count</Form.Label>
                  <Form.Control
                    type="text"
                    name="sold_count"
                    value={productDetail?.sold_count || "0"}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Total Stock</Form.Label>
                  <Form.Control
                    type="text"
                    name="total_stock"
                    value={productDetail?.total_stock || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={!isFormUpdated}>
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <SkeletonCard />
        )}
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminProductDetail;
