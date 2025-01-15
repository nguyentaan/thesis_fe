import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Card, CardContent } from "../ui/card";
import { Input } from "./input";

const EmbeddingFileForm = ({ selectedFiles, handleStartEmbedding }) => {
  const [embeddingModel, setEmbeddingModel] = useState("");
  const [error, setError] = useState("");
  console.log(selectedFiles);
  useEffect(() => {
  }, [selectedFiles]);

  const handleUpload = () => {
    if (!embeddingModel.trim()) {
      setError("Embedding model is required.");
      return;
    }
    handleStartEmbedding();
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg shadow-lg text-[#1A1A1A]">
      {selectedFiles?.length > 0 ? (
        selectedFiles?.map((file, index) => (
          <Card key={index} className="rounded-lg border-none mt-4">
            <CardContent className="p-4">
              <div className="flex w-full">
                <div className="flex flex-col relative w-full">
                  <span>
                    <p className="text-sm font-semibold">File ID: {file._id}</p>
                  </span>
                  <span>
                    <p className="text-sm font-semibold">File Name: {file.file_name}</p>
                  </span>
                  <span>
                    <p className="text-sm font-semibold">File Type: {file.file_type}</p>
                  </span>
                  <span>
                    <p className="text-sm font-semibold">Created At: {file.create_date}</p>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No files selected for embedding.</p>
      )}
      {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
      <div className="mt-4 space-y-4">
        <Input
          type="text"
          placeholder="Enter embedding model (e.g., bert-base-uncased)"
          value={embeddingModel}
          onChange={(e) => setEmbeddingModel(e.target.value)}
          className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <div className="text-center">
          <Button
            onClick={handleUpload}
            className="w-full py-2 px-4 text-[#1A1A1A] rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
          >
            Embed Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmbeddingFileForm;
