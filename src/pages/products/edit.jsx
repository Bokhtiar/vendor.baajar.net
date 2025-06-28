import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { TextAreaInput, TextInput } from "../../components/input";
import { NetworkServices } from "../../network";
import Select from "react-select";
import { Toastify } from "../../components/toastify";
import Spinner from "../../utils/loading/spinner";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);

  const [images, setImages] = useState([null, null, null, null]);
  const [defaultImages, setDefaultImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      const categoryList = response?.data?.data?.categories.map((cat) => ({
        label: cat.category_name,
        value: cat.category_id,
        children: cat.children || [],
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await NetworkServices.Product.show(id);
      if (res?.status === 200) {
        const data = res.data.data.product;

        setValue("productName", data.product_name);
        setValue("short_description", data.short_description);
        setValue("slug", data.slug);
        setValue("brand", data.brand);
        setValue("regularPrice", data.reguler_price);
        setValue("offerPrice", data.offer_price);
        setValue("sku", data.sku);
        setValue("shortDescription", data.description);
        setValue("stockQuantity", data.stock);

        const categoryOption = {
          label: data.category?.category_name || "",
          value: data.category?.category_id || null,
          children: data.category?.children || [],
        };
        setSelectedCategory(categoryOption);

        const subOption = data.subcategory
          ? {
              label: data.subcategory.category_name,
              value: data.subcategory.category_id,
              children: data.subcategory.children || [],
            }
          : null;
        setSelectedSubCategory(subOption);

        const childOption = data.childcategory
          ? {
              label: data.childcategory.category_name,
              value: data.childcategory.category_id,
            }
          : null;
        setSelectedChildCategory(childOption);

        if (categoryOption?.children?.length) {
          const subcats = categoryOption.children.map((sub) => ({
            label: sub.category_name,
            value: sub.category_id,
            children: sub.children || [],
          }));
          setSubCategories(subcats);
        }

        if (subOption?.children?.length) {
          const childCats = subOption.children.map((child) => ({
            label: child.category_name,
            value: child.category_id,
          }));
          setChildCategories(childCats);
        }

        setDefaultImages(data.product_image || []);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }, [id, setValue]);

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [fetchCategories, fetchProduct]);

  const handleImagesSelected = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [null, null, null, null];
    files.forEach((file, i) => {
      updatedImages[i] = previews[i];
    });
    setImages(updatedImages);
    setImageFiles(files);
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    setSelectedSubCategory(null);
    setSelectedChildCategory(null);

    if (option?.children?.length > 0) {
      const subs = option.children.map((sub) => ({
        label: sub.category_name,
        value: sub.category_id,
        children: sub.children || [],
      }));
      setSubCategories(subs);
    } else {
      setSubCategories([]);
    }

    setChildCategories([]);
  };

  const handleSubCateChange = (option) => {
    setSelectedSubCategory(option);
    setSelectedChildCategory(null);

    if (option?.children?.length > 0) {
      const childs = option.children.map((child) => ({
        label: child.category_name,
        value: child.category_id,
      }));
      setChildCategories(childs);
    } else {
      setChildCategories([]);
    }
  };

  const handleChildCateChange = (option) => {
    setSelectedChildCategory(option);
  };

  const onSubmit = async (data) => {
    if (!selectedCategory) {
      Toastify.Error("Please select a category.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("product_name", data.productName);
      formData.append("short_description", data.short_description);
      formData.append("slug", data.slug);
      formData.append("brand", data.brand);
      formData.append("reguler_price", data.regularPrice);
      formData.append("offer_price", data.offerPrice || "");
      formData.append("description", data.shortDescription || "");
      formData.append("sku", data.sku || "");
      formData.append("stock", data.stockQuantity || "");
      formData.append("purchase_price", "222.00");
      formData.append("status", "1");

      formData.append("category_id", selectedCategory?.value);
      if (selectedSubCategory) {
        formData.append("sub_category_id", selectedSubCategory.value);
      }
      if (selectedChildCategory) {
        formData.append("child_category_id", selectedChildCategory.value);
      }

      imageFiles.forEach((file, index) => {
        formData.append(`product_image[${index}]`, file);
      });

      const res = await NetworkServices.Product.update(id, formData);
      if (res?.status === 200) {
        Toastify.Success("Product updated successfully");
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Section */}
      <div className="grid grid-cols-4 gap-4">
        {(images.some(Boolean) ? images : defaultImages).map((img, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded overflow-hidden flex justify-center items-center">
            {img ? (
              <img
                src={
                  images.some(Boolean)
                    ? img
                    : `${import.meta.env.VITE_API_SERVER}${img}`
                }
                alt={`Preview ${i}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="/image-placeholder.svg" alt="Placeholder" className="w-12 h-12" />
            )}
          </div>
        ))}
      </div>

      <div onClick={() => fileInputRef.current.click()} className="cursor-pointer text-sm text-gray-700 flex items-center gap-2 w-max">
        <FiUpload className="text-3xl" />
        <span>Upload Photo</span>
        <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImagesSelected} />
      </div>

      {/* Form Inputs */}
      <TextInput name="productName" label="Product Name" control={control} error={errors.productName?.message} />
      <div className="grid grid-cols-2 gap-4">
        <TextInput name="short_description" label="Shor descriptin" control={control} error={errors.short_description?.message} />
        <TextInput name="slug" label="Slug" control={control} error={errors.slug?.message} />
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 mb-1">Category</label>
          <Select value={selectedCategory} onChange={handleCategoryChange} options={categories} styles={customStyles} isClearable />
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1">Subcategory</label>
          <Select value={selectedSubCategory} onChange={handleSubCateChange} options={subcategories} styles={customStyles} isClearable />
        </div>
      </div>

      {/* ✅ Child Category (Conditional or Always Visible) */}
      {childCategories.length > 0 && (
        <div>
          <label className="text-sm text-gray-500 mb-1">Child Category</label>
          <Select value={selectedChildCategory} onChange={handleChildCateChange} options={childCategories} styles={customStyles} isClearable />
        </div>
      )}

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        <TextInput name="brand" label="Brand" control={control} error={errors.brand?.message} />
        <TextInput name="sku" label="SKU" control={control} error={errors.sku?.message} />
        <TextInput name="stockQuantity" label="Stock Quantity" control={control} type="number" error={errors.stockQuantity?.message} />
        <TextInput name="regularPrice" label="Regular Price" control={control} error={errors.regularPrice?.message} />
        <TextInput name="offerPrice" label="Offer Price" control={control} error={errors.offerPrice?.message} />
      </div>

      <TextAreaInput name="shortDescription" label="Short Description" control={control} error={errors.shortDescription?.message} />

      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-full">
        {loading ? <Spinner name="Updating" /> : "Update Product"}
      </button>
    </form>
  );
};

export default ProductUpdate;
