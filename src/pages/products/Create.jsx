import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import { NetworkServices } from "../../network";
import Select from "react-select";
import { Toastify } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/loading/spinner";

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImagesSelected = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [null, null, null, null];
    files.forEach((file, idx) => {
      updatedImages[idx] = previewUrls[idx];
    });
    setImages(updatedImages);
    setImageFiles(files);
    setValue("images", files);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      const topLevel = response?.data?.data?.categories?.map((cat) => ({
        label: cat.category_name,
        value: cat.category_id,
        children: cat.children || [],
      }));
      setCategories(topLevel);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    setSelectedSubCategory(null);
    setSelectedChildCategory(null);

    if (option?.children?.length > 0) {
      const subcats = option.children.map((child) => ({
        label: child.category_name,
        value: child.category_id,
        children: child.children || [],
      }));
      setSubCategories(subcats);
    } else {
      setSubCategories([]);
    }
    setChildCategories([]);
  };

  const handleSubCateChange = (option) => {
    setSelectedSubCategory(option);
    setSelectedChildCategory(null);

    if (option?.children?.length > 0) {
      const childCats = option.children.map((child) => ({
        label: child.category_name,
        value: child.category_id,
      }));
      setChildCategories(childCats);
    } else {
      setChildCategories([]);
    }
  };

  const handleChildCateChange = (option) => {
    setSelectedChildCategory(option);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "5px",
      borderRadius: "1px",
      borderColor: "#ccc",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const onSubmit = async (data) => {
    console.log("formData", data);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("product_name", data?.productName);
      formData.append("short_description", data?.short_description);
      formData.append("slug", data?.slug);
      formData.append("brand", data?.brand || "");
      formData.append("reguler_price", data?.regularPrice);
      formData.append("offer_price", data?.offerPrice || "");
      formData.append("stock", data.stockQuantity || "");
      formData.append("status", "1");
      formData.append("description", data?.shortDescription || "");
      formData.append("color", JSON.stringify(data.color || []));
      formData.append("size", JSON.stringify(data.size || []));
      formData.append("sku", data.sku || "");
      formData.append("purchase_price", "222.00");
      formData.append("lat", data.lat || "");
      formData.append("long", data.long || "");

      // Category IDs
      formData.append("category_id", selectedCategory?.value || "");
      formData.append("sub_category_id", selectedSubCategory?.value || "");
      formData.append("child_category_id", selectedChildCategory?.value || "");

      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (imageFiles.length) {
        imageFiles.forEach((file, index) => {
          formData.append(`product_image[${index}]`, file);
        });
      }

      const response = await NetworkServices.Product.store(formData);
      if (response && response.status === 200) {
        Toastify.Success("Product created successfully");
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative bg-gray-100 h-32 rounded-md overflow-hidden flex justify-center items-center"
          >
            {img ? (
              <img src={img} alt={`Preview ${index}`} className="object-cover w-full h-full" />
            ) : (
              <img src="/image-placeholder.svg" alt="Upload" className="w-12 h-12" />
            )}
          </div>
        ))}
      </div>

      <div
        onClick={() => fileInputRef.current.click()}
        className="cursor-pointer text-sm text-gray-700 flex items-center gap-2 w-max"
      >
        <FiUpload className="text-3xl" />
        <span>Upload Photo</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleImagesSelected}
        />
      </div>

      <TextInput
        name="productName"
        label="Product Name"
        placeholder="Enter product name"
        control={control}
        rules={{ required: "Product name is required" }}
        error={errors.productName?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="short_description"
          label="Short description"
          placeholder="Enter short name"
          control={control}
          rules={{ required: "Short description is required" }}
          error={errors.short_description?.message}
        />
        <TextInput
          name="slug"
          label="Slug"
          placeholder="Enter slug"
          control={control}
          rules={{ required: "Slug is required" }}
          error={errors.slug?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Category</label>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            placeholder="Select a category"
            styles={customStyles}
            isClearable
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">Subcategory</label>
          <Select
            value={selectedSubCategory}
            onChange={handleSubCateChange}
            options={subcategories}
            placeholder="Select a subcategory"
            styles={customStyles}
            isClearable
          />
        </div>
      </div>

      {childCategories.length > 0 && (
        <div>
          <label className="block text-sm text-gray-500 mb-2">Child Category</label>
          <Select
            value={selectedChildCategory}
            onChange={handleChildCateChange}
            options={childCategories}
            placeholder="Select child category"
            styles={customStyles}
            isClearable
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="brand"
          label="Brand"
          placeholder="Enter brand"
          control={control}
          rules={{ required: "Brand is required" }}
          error={errors.brand?.message}
        />
        <TextInput
          name="sku"
          label="SKU"
          placeholder="Enter SKU"
          control={control}
          rules={{ required: "SKU is required" }}
          error={errors.sku?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="stockQuantity"
          label="Stock Quantity"
          placeholder="Enter quantity"
          type="number"
          control={control}
          error={errors.stockQuantity?.message}
        />
        <TextInput
          name="regularPrice"
          label="Regular Price"
          placeholder="Enter price"
          control={control}
          error={errors.regularPrice?.message}
        />
      </div>

      <TextInput
        name="offerPrice"
        label="Offer Price"
        placeholder="Enter offer price"
        control={control}
        error={errors.offerPrice?.message}
      />

      <TextAreaInput
        name="shortDescription"
        placeholder="Enter short description"
        label="Short Description"
        control={control}
        rules={{ required: "Short description is required" }}
        error={errors.shortDescription?.message}
      />

      <button
        type="submit"
        className="bg-red-600 text-white px-6 h-10 w-50 py-2 rounded-full"
      >
        {loading ? <Spinner name={"creating"} /> : "Create Product"}
      </button>
    </form>
  );
};

export default ProductCreate;
