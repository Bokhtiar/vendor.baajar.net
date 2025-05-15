import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';

const ProductCreate = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [images, setImages] = useState([null, null, null, null]); // Store preview URLs
  const [imageFiles, setImageFiles] = useState([]); // Store actual File objects
  const fileInputRef = useRef(null);

  const handleImagesSelected = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
    const previewUrls = files.map(file => URL.createObjectURL(file));

    const updatedImages = [null, null, null, null];
    files.forEach((file, idx) => {
      updatedImages[idx] = previewUrls[idx];
    });

    setImages(updatedImages);
    setImageFiles(files);
    setValue('images', files); // Store in react-hook-form
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    formData.append('productName', data.productName);
    // Add other form fields similarly...

    // Send formData via axios/fetch to backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image preview slots */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative bg-gray-100 h-32 rounded-md overflow-hidden flex justify-center items-center">
            {img ? (
              <img src={img} alt={`Preview ${index}`} className="object-cover w-full h-full" />
            ) : (
              <img src="/image-placeholder.svg" alt="Upload" className="w-12 h-12" />
            )}
          </div>
        ))}
      </div>

      {/* Upload button (custom div triggers file input) */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="cursor-pointer text-sm text-gray-700 flex items-center gap-2 w-max"
      >
        <span><FiUpload className='text-3xl'/></span>
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

      {/* Hidden field to register files in react-hook-form */}
      <input type="hidden" {...register('images')} />

      {/* Other form inputs */}
      
      <input
        type="text"
        placeholder="Product Name"
        {...register('productName')}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Short Name"
          {...register('shortName')}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Slug"
          {...register('slug')}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select {...register('category')} className="p-2 border border-gray-300 rounded">
          <option value="">Select Product Category</option>
        </select>
        <select {...register('subCategory')} className="p-2 border border-gray-300 rounded">
          <option value="">Select Product Sub Category</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Child Category"
          {...register('childCategory')}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Brand"
          {...register('brand')}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="SKU"
          {...register('sku')}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          {...register('stockQuantity')}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Regular Price"
          {...register('regularPrice')}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Offer Price"
          {...register('offerPrice')}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <textarea
        placeholder="Short Description"
        {...register('shortDescription')}
        className="w-full p-2 border border-gray-300 rounded h-32"
      ></textarea>

      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-full">
        Create Product
      </button>
    </form>
  );
};

export default ProductCreate;
