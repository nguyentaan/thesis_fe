import React, { useState, useEffect } from "react";
import { useNewProductProvider } from "../../../hooks/use-new-product-form.js";
import { useStepper } from "../../ui/stepper/Stepper.tsx";
import { Label } from "../../ui/label.js";
import { Input } from "../../ui/input.js";
import { Button } from "../../ui/button.js";
import axios from "axios";

const CloudinaryImagePreview = ({ imageUrl }) => {
    if (!imageUrl) return null;

    return (
        <div className="mt-4">
            <img src={imageUrl || ""} alt="Preview" className="w-40 h-40 object-contain" />
        </div>
    );
};

const SelectUploadImage = () => {
    const { product, setProduct } = useNewProductProvider();
    const { nextStep, prevStep } = useStepper();

    const [isCloudUpload, setIsCloudUpload] = useState(false);
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    // Use useEffect to handle file input preview
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setImageUrl(objectUrl);
        }
    }, [selectedFile]);

    const handleToggle = (e) => {
        setIsCloudUpload(e.target.checked);
        setImageUrl("");
        setSelectedFile(null);
        setError("");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError("");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file before uploading.");
            return;
        }

        setIsUploading(true);
        setError("");
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "product_imgs"); // ✅ Cloudinary preset

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            if (response.data.secure_url) {
                setImageUrl(response.data.secure_url);
                setSelectedFile(null);
            }
        } catch (err) {
            setError("Upload failed. Please try again.");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleNext = () => {
        if (isCloudUpload && !imageUrl) {
            setError("Please upload an image before proceeding.");
            return;
        }
        if (!imageUrl) {
            setError("Please fill in all required fields.");
            return;
        }
        setProduct({ ...product, imageUrl });
        nextStep();
    };

    const handleBack = () => {
        prevStep();
    };

    return (
        <div className="flex flex-col gap-4">
            <Label className="flex items-center gap-2">
                <input type="checkbox" checked={isCloudUpload} onChange={handleToggle} />
                Use File Upload
            </Label>

            {imageUrl && <CloudinaryImagePreview imageUrl={imageUrl} />}

            {isCloudUpload ? (
                <>
                    <Input type="file" onChange={handleFileChange} />
                    <Button onClick={handleUpload} disabled={isUploading} className="w-auto">
                        {isUploading ? "Uploading..." : "Push to Cloudinary"}
                    </Button>
                    {error && <p className="text-red-500">{error}</p>}
                </>
            ) : (
                <Input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                />
            )}

            {/* Display preview for both file and URL */}
            <div className="grid grid-cols-2 gap-4 items-center w-full">
                <Button onClick={handleBack} className="btn-primary">
                    Prev
                </Button>
                <Button onClick={handleNext} className="btn-primary">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SelectUploadImage;
