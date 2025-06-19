import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";
import DeleteProductModal from "../../components/modal/productDelete";
import { networkErrorHandeller } from "../../utils/helpers";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [productList, setProductList] = useState([]);

  // Fetch categories from API
  const fetchProduct = useCallback(async () => {
    try {
      // setLoading(true);
      const response = await NetworkServices.Product.index();
      console.log("response", response);

      if (response?.status === 200) {
        setProductList(response?.data?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    // setLoading(false);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log("exam", productList);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("selectedProduct",selectedProduct)

const handleDelete = (product) => {
  setSelectedProduct(product);
  setIsOpen(true);
};

  const handleDeleteClick = async (id) => {
    try {
      const response = await NetworkServices.Product.destroy(id);
      console.log("response",response)
      if (response?.status === 200) {
        Toastify.Info("Exam deleted successfully.");
        fetchProduct();
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      name: "SN",
      width: "80px",
      center: true,
      cell: (row, index) => (
        <span className="text-base font-medium">
          {String(index + 1).padStart(2, "0")}.
        </span>
      ),
    },
    {
      name: "Photo",
      cell: (row) => (
        <img
          src={`${import.meta.env.VITE_API_SERVER}${row?.product_image[0]}`}
          alt={row.name}
          className="w-24 h-24 object-cover rounded-md shadow-sm"
        />
      ),
      width: "160px",
      center: true,
    },
    {
      name: "Name of the Product",
      selector: (row) => row.product_name,
      width: "20%",
      cell: (row) => (
        <div className="text-left font-medium text-black font-poppins text-base">
          {row.product_name}
        </div>
      ),
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      center: true,
      cell: (row) => (
        <div className="  font-medium text-gray-800 font-poppins text-base">
          {row.sku}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.offer_price,
      center: true,
      cell: (row) => (
        <div className="text-base font-medium text-gray-900">
          {row.offer_price}
        </div>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <button className="text-black hover:text-blue-600 cursor-pointer transition">
            <Link to={`/dashboard/products/${row?.id}`}>
            <RiEditFill />
            </Link>
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800 cursor-pointer transition"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        color: "#8B8B8B",
      },
    },
    rows: {
      style: {
        minHeight: "100px",
        borderBottom: "1px solid #E5E7EB",
      },
    },
    cells: {
      style: {
        paddingTop: "16px",
        paddingBottom: "16px",
      },
    },
  };

  return (
    <div className="w-full p-4  relative">
      <DataTable
        columns={columns}
        data={productList}
        customStyles={customStyles}
        highlightOnHover
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20]}
      />
      {isOpen && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onDelete={() => handleDeleteClick(selectedProduct.id)}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProductTable;
