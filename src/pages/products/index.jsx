import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";
import DeleteProductModal from "../../components/modal/productDelete";
import { networkErrorHandeller } from "../../utils/helpers";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { Link } from "react-router-dom";
import { TableSkeleton } from "../../components/Skeleton/Skeleton";

const ProductTable = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  console.log("totalRows", totalRows);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Fetch categories from API
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      const response = await NetworkServices.Product.index(
        queryParams.toString()
      );
      console.log("response", response);

      if (response?.status === 200) {
        setProductList(response?.data?.data?.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleDeleteClick = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await NetworkServices.Product.destroy(id);
      console.log("response", response);
      if (response?.status === 200) {
        Toastify.Success(
          response?.data?.message || "Product deleted successfully"
        );
        fetchProduct();
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setIsOpen(false);
    setDeleteLoading(false);
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
          src={`${import.meta.env.VITE_API_SERVER}${row?.thumbnail}`}
          alt={row.product_name}
          className="w-24 h-24 object-cover rounded-md shadow-sm"
        />
      ),
      width: "160px",
      // center: true,
    },
    {
      name: "Name of the Product",
      selector: (row) => row.product_name,
      width: "20%",
      cell: (row) => (
        <div className="text-left font-medium text-black  text-base">
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
          {row.offer_price}/-
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
          <div className="mt-2">
            <Link to={`/dashboard/products-details/${row.id}`} title="Show Details">
              <button className="text-blue-600 text-xl cursor-pointer">
                <FaEye />
              </button>
            </Link>
          </div>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800 cursor-pointer transition"
          >
            <svg
              className="w-5 h-6 text-red-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5 0V4a1 1 0 00-1-1H7a1 1 0 00-1 1v3"
              />
            </svg>
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
  useEffect(() => {
    document.title = "Vendor | Product ";
  }, []);

  return (
    <div className="w-full  font-poppins relative">
      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={productList}
          customStyles={customStyles}
          highlightOnHover
          pagination
          responsive
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationDefaultPage={currentPage}
        />
      )}
      {isOpen && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onDelete={() => handleDeleteClick(selectedProduct.id)}
          onCancel={handleCancel}
          deleteLoading={deleteLoading}
        />
      )}
    </div>
  );
};

export default ProductTable;
