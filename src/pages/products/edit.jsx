import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { ImageUpload, TextAreaInput, TextInput } from "../../components/input";
import { NetworkServices } from "../../network";
import Select from "react-select";
import { Toastify } from "../../components/toastify";
import Spinner from "../../utils/loading/spinner";
import { networkErrorHandeller } from "../../utils/helpers";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [defaultimages, setDefaultImages] = useState([null, null, null, null]);
  const fileInputRef = useRef(null);
  const [color, setColor] = useState([]);
  const [colorShow, setColorShow] = useState([]);
  const [unit, setunit] = useState([]);
  const [brand, setBrand] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [singleAttribute, setSingleAttribute] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  console.log("product", product);
  const handleColorChange = (option) => {
    setSelectedColor(option);
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
  const handleBrandChange = (option) => {
    setSelectedBrand(option);
    console.log(option);
  };

  console.log("selectedBrand", selectedBrand);

  console.log("unit", unit);

  const fetchProduct = async () => {
    try {
      const res = await NetworkServices.Product.show(id);
      console.log("ressingle", res);
      if (res?.status === 200) {
        const data = res?.data?.data?.product;
        const colorData = res?.data?.data?.colors;
        const attributeData = res?.data?.data?.attributes;

        setProduct(data);
        setColorShow(colorData);
        setSingleAttribute(attributeData);

        setValue("productName", data.product_name);
        setValue("shortName", data.short_description);
        setValue("slug", data.slug);
        setValue("brand", data.brand);
        setValue("regularPrice", data.reguler_price);
        setValue("offerPrice", data.offer_price);
        setValue("sku", data.sku);
        setValue("shortDescription", data.description);
        setValue("stockQuantity", data.stock);
        setValue("purchase_price", data.purchase_price);
        // setValue("unit_id", JSON.parse(data.color_id));
        // setValue("thumbnail", data?.thumbnail);
        // setValue("sub_category", data.sub_category_id);

        setSelectedCategory({
          label: data.category.category_name,
          value: data.category.category_id,
        });

        // Optional: Set initial preview images if stored
        setDefaultImages(data?.product_image || [null, null, null, null]);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

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
      console.log("brand", response);
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("product_name", data?.productName || "");
      formData.append("short_description", data?.shortName || "");
      formData.append("category_id", selectedCategory?.value || "");
      formData.append("brand_id", selectedBrand?.value || product?.brand_id || "");
      formData.append(
        "sub_category_id",
        selectedSubCategory?.value || product?.sub_category_id || ""
      );
      formData.append(
        "color_id",
        JSON.stringify(
          selectedColor?.length
            ? selectedColor.map((c) => c.value)
            : product?.color_id
            ? JSON.parse(product.color_id)
            : []
        )
      );

      formData.append(
        "attribute_id",

        JSON.stringify(
          selectedAttribute?.length
            ? selectedAttribute.map((c) => c.value)
            : product?.attribute_id
            ? JSON.parse(product.attribute_id)
            : []
        )
      );
      // formData.append(
      //   "unit_id",
      //   JSON.stringify(

      //      selectedUnit.map((c) => c.value)
      //       || JSON.parse(product?.unit_id )
      //   )
      // );
      formData.append("unit_id", selectedUnit?.value || product?.unit_id || "");
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
      }else{
        formData.append("thumbnail", product?.thumbnail);
      }

      // product_image multiple images
      if (imageFiles) {
        imageFiles.forEach((file, index) => {
          formData.append(`product_image[${index}]`, file);
        });
      }

      formData.append("_method", "PUT");
      const res = await NetworkServices.Product.update(id, formData);
      if (res?.status === 200) {
        Toastify.Success(res?.data?.message || "Product updated successfully");
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.error("Update failed:", err);
      networkErrorHandeller(err);
    }
    setLoading(false);
  };
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
  useEffect(() => {
    document.title = "Vendor | Update-Product ";
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {(images.some((img) => img !== null) ? images : defaultimages).map(
          (img, index) => (
            <div
              key={index}
              className="bg-gray-100 h-32 flex items-center justify-center overflow-hidden rounded-md"
            >
              {img ? (
                <img
                  src={
                    images.some((img) => img !== null)
                      ? img
                      : `${import.meta.env.VITE_API_SERVER}${img}`
                  }
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
          )
        )}
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
        control={control}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-2 text-gray-500">Category</label>
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            styles={customStyles}
            placeholder="Select category"
            isClearable
            // placeholder={
            //   categories.find((item) => item?.category_id == product?.category_id)
            //     ?.category_name ?? "select parent Category"
            // }
          />
        </div>
        <div>
          <label className="text-sm mb-2 text-gray-500">Subcategory</label>
          <Select
            name="sub_category"
            value={selectedSubCategory}
            onChange={setSelectedSubCategory}
            options={subcategories}
            // placeholder={product?.product_name || "select sub categories"}
            placeholder={
              categories.find(
                (item) => item?.category_id == product?.sub_category_id
              )?.category_name ?? "select Sub Categories"
            }
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
            placeholder={
              colorShow?.length > 0
                ? colorShow.map((c) => c.name).join(" , ")
                : "Select a color"
            }
            styles={customStyles}
            isClearable
          />
        </div>
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Unit</label>
          <Select
            value={selectedUnit}
            onChange={handleUnitChange}
            options={unit}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder={
              unit?.find((c) => c?.value == product?.unit_id)?.label ||
              "Select unit"
            }
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
            placeholder={
              singleAttribute?.length > 0
                ? singleAttribute.map((c) => c.name).join(" , ")
                : "Select a color"
            }
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
            imgUrl={product?.thumbnail}
            error={errors.thumbnail?.message}
          />
        </div>

        <TextInput
          name="sku"
          label="SKU"
          control={control}
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
        <div className="mb-">
          <label className="block text-sm  text-gray-500 mb-2">Brand</label>
          <Select
            onChange={handleBrandChange}
            options={brand}
            onMenuOpen={() => {
              console.log("Menu opened");
            }}
            placeholder={
              brand?.find((c) => c?.value == product?.brand_id)?.label ||
              "Select Brand"
            }
            styles={customStyles}
            isClearable
          />
        </div>
        <TextInput
          name="purchase_price"
          label="Purchase Price"
          placeholder="Enter purchase price"
          control={control}
          error={errors.purchase_price?.message}
        />
        <TextInput
          name="regularPrice"
          label="Regular Price"
          placeholder="regular Price"
          control={control}
          error={errors.regularPrice?.message}
        />
        <TextInput
          name="offerPrice"
          label="Offer Price"
          placeholder="offer Price"
          control={control}
          error={errors.offerPrice?.message}
        />
      </div>

      <TextAreaInput
        name="shortDescription"
        label="Short Description"
        placeholder="short description"
        control={control}
        error={errors.shortDescription?.message}
      />

      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-full"
      >
        {loading ? <Spinner name={"Updating"} /> : "Update Product"}
      </button>
    </form>
  );
};

export default ProductUpdate;
