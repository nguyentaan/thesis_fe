import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { getAllFile } from "../../Slices/UserSlice";
import ContentLayout from "../admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import PlaceholderContent from "../misc/placeholder-content";
import { TableActionProvider } from "../../providers/table-action-provider";
import { SkeletonCard } from "../ui/skeleton-card";
import { DataTable } from "../ui/data-table";
import { CustomDialog } from "../ui/custom-dialog";
import { SearchFilterCustom } from "../misc/search-filter-custom";
import { fileEmbeddingColumn } from "../misc/model/file-embedding-column";
import EmbeddingFileForm from "../ui/embedding_file_form";
import { getAllChunkFromSelectedFile, embeddingChunkingList } from "../../Slices/UserSlice";

const AdminEmbeddingPage = () => {
  const dispatch = useDispatch();
  const { dataFileUpload, isFileLoading } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getAllFile({}));
    }
  }, [dispatch, isAuth]);

  const displayDeleteModal = (data) => {
    setDataDelete(data);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
  };

  const handleFileSelect = (fileData, isChecked) => {
    setSelectedFiles((prev) => {
      if (isChecked) {
        // Add the entire row data if it's not already in the list
        return prev.some((item) => item._id === fileData._id) ? prev : [...prev, fileData];
      } else {
        // Remove the fileData from the list
        return prev.filter((item) => item._id !== fileData._id);
      }
    });
  };

  const handleEmbedding = async (jsonList) => {
    await dispatch(embeddingChunkingList(jsonList));
  };
  
  const handleStartEmbedding = async () => {
    if (selectedFiles.length === 0) {
      alert("No files selected for embedding!");
      return;
    }
    const groupedFiles = selectedFiles.reduce((acc, file) => {
      const { file_type, chunk_lists } = file;
      if (!acc[file_type]) {
        acc[file_type] = { type: file_type, chunk_list: [] };
      }
      acc[file_type].chunk_list.push(...chunk_lists);
      return acc;
    }, {});

    const payload = Object.values(groupedFiles);
    alert(`Embedding started for files grouped by type.`);
    console.log("Selected files for embedding (grouped by type):", payload);
    try {
      const response = await dispatch(
        getAllChunkFromSelectedFile({
          payload: payload,
        })
      ).unwrap();
      const json_list = response.flatMap(group => group.products);
      await handleEmbedding(json_list);
    } catch (error) {
      console.error("Error during embedding:", error);
      alert(`An error occurred: ${error.message || "Unknown error"}`);
    } finally {
      // Clear selection after embedding
      setSelectedFiles([]);
    }
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
            <BreadcrumbPage>File Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <TableActionProvider initialValues={{}}>
          {isFileLoading ? (
            <SkeletonCard />
          ) : (
            <DataTable
              extra={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full h-full">
                  <CustomDialog
                    button={<Button>Embedding File</Button>}
                    noFooter
                    title="Embedding File"
                  >
                    {({ close }) => (
                      <EmbeddingFileForm
                        handleStartEmbedding={handleStartEmbedding}
                        selectedFiles={selectedFiles} // Pass selected files to the form
                      />
                    )}
                  </CustomDialog>
                  <SearchFilterCustom
                    setSearch={() => { }}
                    searchPlaceholder="Search by name"
                  />
                </div>
              }
              isLoading={isFileLoading}
              columns={fileEmbeddingColumn(handleFileSelect, selectedFiles)} // Pass selectedFiles to column definition
              data={dataFileUpload?.files || []}
            />
          )}
        </TableActionProvider>
      </PlaceholderContent>
      {showSuccessToast && (
        <div className="toast toast-success">
          File embedding successfully!
        </div>
      )}
    </ContentLayout>
  );
};

export default AdminEmbeddingPage;
