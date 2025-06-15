import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import { NetworkServices } from "../../network";

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const selectedCategoryId = watch("category_id");

  console.log("categories", categories);

  useEffect(() => {
    setValue("subCategory", null);
  }, [selectedCategoryId, setValue]);

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
      console.log("response", response);
      const formattedCategories = response?.data?.data?.map((item) => ({
        value: item.category_name, // dropdown value
        label: item.category_name, // dropdown label
        ...item,
      }));

      setCategories(formattedCategories); // <-- Create this state using useState

      console.log("Fetched formatted categories:", formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    formData.append("productName", data.productName);
    // Add other form fields similarly...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative bg-gray-100 h-32 rounded-md overflow-hidden flex justify-center items-center"
          >
            {img ? (
              <img
                src={img}
                alt={`Preview ${index}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="/image-placeholder.svg"
                alt="Upload"
                className="w-12 h-12"
              />
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

      <input type="hidden" {...register("images")} />

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
          name="shortName"
          label="Short Name"
          placeholder="Enter short name"
          control={control}
          rules={{ required: "Short name is required" }}
          error={errors.shortName?.message}
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
        {/* <SingleSelect
          name="category_id"
          control={control}
          options={categories}
          onSelected={(selected) =>
            setValue("category_id", selected?.value || null)
          }
          // value={categories.find((item) => item.value === watch('category_id')) || null}
          placeholder={
            categories.find((item) => item.value === watch("category_id"))
              ?.label ?? "Select Parent Category Id"
          }
          error={errors.category_id?.message}
          label="Choose a Parent Category"
          isClearable
        /> */}
        {/* new */}
        <SingleSelect
          name="category_name"
          control={control}
          options={categories}
          rules={{ required: "Category selection is required" }}
          onSelected={(selected) =>
            setValue("category_id", selected?.category_id)
          }
          placeholder="Select a category *"
          error={errors.category_name?.message}
          label="Choose a category"
          // error={errors} // Pass an error message if validation fails
        />

        {/* <SingleSelect
  name="subCategory"
  control={control}
  options={mappedSubCategoryOptions}
  onSelected={(selected) => setValue('subCategory', selected?.value || null)}
  value={mappedSubCategoryOptions.find((item) => item.value === watch('subCategory')) || null}
  label="Sub Category"
  placeholder="Select sub category"
  rules={{ required: 'Sub category is required' }}
  error={errors.subCategory?.message}
  isClearable
  isDisabled={!selectedCategoryId}
/> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="childCategory"
          label="Child Category"
          placeholder="Enter child category"
          control={control}
          error={errors.childCategory?.message}
        />
        <TextInput
          name="brand"
          label="Brand"
          placeholder="Enter brand"
          control={control}
          rules={{ required: "Brand is required" }}
          error={errors.brand?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="sku"
          label="SKU"
          placeholder="Enter SKU"
          control={control}
          rules={{ required: "SKU is required" }}
          error={errors.sku?.message}
        />
        <TextInput
          name="stockQuantity"
          label="Stock Quantity"
          placeholder="Enter quantity"
          type="number"
          control={control}
          error={errors.stockQuantity?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="regularPrice"
          label="Regular Price"
          placeholder="Enter price"
          control={control}
          error={errors.regularPrice?.message}
        />
        <TextInput
          name="offerPrice"
          label="Offer Price"
          placeholder="Enter offer price"
          control={control}
          error={errors.offerPrice?.message}
        />
      </div>

      <div>
        <TextAreaInput
          name="shortDescription"
          placeholder="Enter short description"
          label="Short Description"
          control={control}
          rules={{ required: "Short description is required" }}
          error={errors.shortDescription?.message}
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-full"
      >
        Create Product
      </button>
    </form>
  );
};

export default ProductCreate;
