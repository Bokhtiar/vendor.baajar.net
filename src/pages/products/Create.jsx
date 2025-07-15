import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { NetworkServices } from "../../network";
import Select from "react-select";
import { Toastify } from "../../components/toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../../utils/loading/spinner";
import { networkErrorHandeller } from "../../utils/helpers";

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
  const [color, setColor] = useState([]);
  const [unit, setunit] = useState([]);
  const [brand, setBrand] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  // const selectedCategoryId = watch("category_id");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const navigate = useNavigate();

  const handleChange = (option) => {
    setSelectedCategory(option);
    console.log(option);
  };
  const handleSubCateChange = (option) => {
    setSelectedSubCategory(option);
    console.log(option);
  };
  const handleColorChange = (option) => {
    setSelectedColor(option);
    console.log(option);
  };
  const handleBrandChange = (option) => {
    setSelectedBrand(option);
    console.log(option);
  };
  const handleUnitChange = (option) => {
    setSelectedUnit(option);
    console.log(option);
  };
  const handleAttributeChange = (option) => {
    setSelectedAttribute(option);
    console.log(option);
  };

  // useEffect(() => {
  //   setValue("subCategory", null);
  // }, [selectedCategoryId, setValue]);

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
      console.log("resqwwwwponsessss", response);
      const formattedCategories = response?.data?.data?.map((item) => ({
        value: item.category_id, // dropdown value
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

  useEffect(() => {
    if (selectedCategory?.children) {
      const mappedSubcategories = selectedCategory.children.map((child) => ({
        value: child.category_id,
        label: child.category_name,
      }));
      setSubCategories(mappedSubcategories);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const fetchColor = useCallback(async () => {
    try {
      const response = await NetworkServices.Color.index();
      console.log("rcolor", response);
      const formattedColor = response?.data?.data?.map((item) => ({
        value: item.id, // dropdown value
        label: item.name, // dropdown label
        ...item,
      }));

      setColor(formattedColor); // <-- Create this state using useState

      console.log("Fetched formatted categories:", formattedColor);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchColor();
  }, [fetchColor]);

  const fetchUnit = useCallback(async () => {
    try {
      const response = await NetworkServices.Unit.index();
      console.log("unit", response);
      const formattedUnit = response?.data?.data?.map((item) => ({
        value: item.id, // dropdown value
        label: item.name, // dropdown label
        ...item,
      }));

      setunit(formattedUnit); // <-- Create this state using useState

      console.log("Fetched formatted categories:", formattedUnit);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  useEffect(() => {
    if (selectedUnit?.attributes) {
      const mappedSubcategories = selectedUnit.attributes.map((child) => ({
        value: child.id,
        label: child.name,
      }));
      setAttribute(mappedSubcategories);
    } else {
      setAttribute([]);
    }
  }, [selectedUnit]);

  const fetchBrand = useCallback(async () => {
    try {
      const response = await NetworkServices.Brand.index();
      console.log("Brand", response);
      const formattedUnit = response?.data?.data?.map((item) => ({
        value: item.id, // dropdown value
        label: item.name, // dropdown label
        ...item,
      }));

      setBrand(formattedUnit); // <-- Create this state using useState

      console.log("Fetched formatted categories:", formattedUnit);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "5px",
      borderRadius: "1px",
      borderColor: "#ccc",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderColor: "#999",
      },
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

  // const onSubmit = (data) => {
  //   console.log("Form data:", data);
  //   const formData = new FormData();
  //   imageFiles.forEach((file, index) => {
  //     formData.append(`images[${index}]`, file);
  //   });
  //   formData.append("productName", data.productName);
  //   // Add other form fields similarly...
  // };

  const onSubmit = async (data) => {
    console.log("formData", data);
    setLoading(true);
    try {
      // setBtnLoading(true);

      const formData = new FormData();
      formData.append("product_name", data?.productName || "");
      formData.append("short_description", data?.shortName || "");
      formData.append("category_id", selectedCategory?.value || "");
      formData.append("brand_id", selectedBrand?.value || "");
      formData.append("sub_category_id", selectedSubCategory?.value || "");
      formData.append(
        "color_id",
        JSON.stringify(selectedColor?.map((c) => c.value) || [])
      );
      formData.append(
        "attribute_id",
        JSON.stringify(selectedAttribute?.map((c) => c.value) || [])
      );
      formData.append("unit_id", JSON.stringify(selectedUnit?.value || []));
      formData.append("slug", data?.slug || "");
      formData.append("reguler_price", data?.regularPrice || "");
      formData.append("offer_price", data?.offerPrice || "");
      formData.append("stock", data.stockQuantity || "");
      formData.append("status", "1");
      formData.append("description", data?.shortDescription || "");
      formData.append("sku", data.sku || "");
      formData.append("purchase_price", data.purchase_price || "");
      formData.append("lat", data.lat || "");
      formData.append("long", data.long || "");

      // Thumbnail single image
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      // product_image multiple images
      if (imageFiles) {
        imageFiles.forEach((file, index) => {
          formData.append(`product_image[${index}]`, file);
        });
      }

      const response = await NetworkServices.Product.store(formData); // <-- Update API service accordingly

      console.log("response", response);
      if (response && response.status === 200) {
        Toastify.Success("Product created successfully");
        navigate("/dashboard/products"); // Change to your route
      }
    } catch (error) {
      networkErrorHandeller(error);
      console.log(error);
    } finally {
      // setBtnLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Vendor | Create-Product ";
  }, []);

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
          // rules={{ required: "Slug is required" }}
          error={errors.slug?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Category</label>
          <Select
            value={selectedCategory}
            onChange={handleChange}
            options={categories}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a category"
            styles={customStyles}
            isClearable
          />
        </div>
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">
            Subcategory
          </label>
          <Select
            value={selectedSubCategory}
            onChange={handleSubCateChange}
            options={subcategories}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a sub category"
            styles={customStyles}
            isClearable
          />
        </div>
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Color</label>
          <Select
            isMulti
            // value={selectedCategory}
            onChange={handleColorChange}
            options={color}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a color"
            styles={customStyles}
            isClearable
          />
        </div>
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Unit</label>
          <Select
            // value={selectedCategory}
            onChange={handleUnitChange}
            options={unit}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a color"
            styles={customStyles}
            isClearable
          />
        </div>
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Attribute</label>
          <Select
            isMulti
            // value={selectedCategory}
            onChange={handleAttributeChange}
            options={attribute}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a category"
            styles={customStyles}
            isClearable
          />
        </div>
        {/* Thumbnail Upload */}
        <div className=" cursor-pointer">
          <ImageUpload
            name="thumbnail"
            control={control}
            label="Thumbnail"
            // required
            onUpload={(file) => setValue("thumbnail", file)}
            error={errors.thumbnail?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="sku"
          label="SKU"
          placeholder="Enter SKU"
          control={control}
          // rules={{ required: "SKU is required" }}
          error={errors.sku?.message}
        />
        <TextInput
          name="stockQuantity"
          label="Stock Quantity"
          placeholder="Enter quantity"
          rules={{ required: "stock quantity is required" }}
          type="number"
          control={control}
          error={errors.stockQuantity?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Brand</label>
          <Select
            // value={selectedCategory}
            onChange={handleBrandChange}
            options={brand}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder="Select a Brand"
            styles={customStyles}
            isClearable
          />
        </div>
        <TextInput
          name="purchase_price"
          label="Purchase Price"
          placeholder="Enter purchase price"
          control={control}
          rules={{ required: "purchase price is required" }}
          error={errors.purchase_price?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="regularPrice"
          label="Regular Price"
          placeholder="Enter price"
          control={control}
          rules={{ required: "regular price is required" }}
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
          // rules={{ required: "Short description is required" }}
          error={errors.shortDescription?.message}
        />
      </div>

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
