import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { SingleSelect, TextAreaInput, TextInput } from '../../components/input';

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

  const handleImagesSelected = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [null, null, null, null];
    files.forEach((file, idx) => {
      updatedImages[idx] = previewUrls[idx];
    });
    setImages(updatedImages);
    setImageFiles(files);
    setValue('images', files); // Set value in react-hook-form
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    formData.append('productName', data.productName);
    // Add other form fields similarly...
    // Send formData to backend
  };

  // Options arrays for reuse
  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home Appliances', value: 'home-appliances' },
  ];

  const subCategoryOptions = [
    { label: 'Mobile Phones', value: 'mobiles' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Shirts', value: 'shirts' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload Preview */}
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

      {/* Upload Button */}
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

      {/* Hidden input for images */}
      <input type="hidden" {...register('images')} />

      {/* Text Inputs */}
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
        <SingleSelect
          name="category"
          control={control}
          options={[
            { label: 'Electronics', value: 'electronics' },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Home Appliances', value: 'home-appliances' },
          ]}
          label="Category"
          placeholder="Select category"
          rules={{ required: 'Category is required' }}
          error={errors.category?.message}
          isClearable
        />


        <SingleSelect
          name="subCategory"
          control={control}
          options={subCategoryOptions}
          label="Sub Category"
          placeholder="Select sub category"
          rules={{ required: 'Sub category is required' }}
          error={errors.subCategory?.message}
          isClearable
        />
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <TextAreaInput
          name="shortDescription"
          placeholder="Enter short description"
          label="Short Description"
          control={control}
          rules={{ required: "Short description is required" }}
          error={errors.shortDescription?.message}
        />
      </div>

      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-full">
        Create Product
      </button>
    </form>
  );
};

export default ProductCreate;
