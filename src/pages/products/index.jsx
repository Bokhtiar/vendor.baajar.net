import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { RiEditFill } from 'react-icons/ri';
import DeleteProductModal from '../../components/modal/productDelete';


const ProductTable = () => {
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "Men’s Tshirt Sky Blue",
      sku: "MTLV68454",
      price: "1580/-",
      image: "/image/products/image.svg",
    },
    {
      id: 2,
      name: "Men’s Tshirt Premium Blue",
      sku: "MTLV68454",
      price: "1580/-",
      image: "/image/products/image.svg",
    },
    {
      id: 3,
      name: "Men’s Tshirt Black with Print",
      sku: "MTLV68454",
      price: "1580/-",
      image: "/image/products/image.svg",
    },
    {
      id: 4,
      name: "Men’s Tshirt Aqua",
      sku: "MTLV68454",
      price: "1580/-",
      image: "/image/products/image.svg",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleDelete = () => {
    setProductList(prev => prev.filter(p => p.id !== selectedProduct.id));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      name: 'SN',
      width: '80px',
      center: true,
      cell: (row, index) => (
        <span className="text-base font-medium">{String(index + 1).padStart(2, '0')}.</span>
      ),
    },
    {
      name: 'Photo',
      cell: row => (
        <img
          src={row.image}
          alt={row.name}
          className="w-24 h-24 object-cover rounded-md shadow-sm"
        />
      ),
      width: '160px',
      center: true,
    },
    {
      name: 'Name of the Product',
      selector: row => row.name,
      width: '20%',
      cell: row => (
        <div className="text-left font-medium text-black font-poppins text-base">{row.name}</div>
      ),
    },
    {
      name: 'SKU',
      selector: row => row.sku,
      center: true,
      cell: row => (
        <div className="  font-medium text-gray-800 font-poppins text-base">{row.sku}</div>
      ),
    },
    {
      name: 'Price',
      selector: row => row.price,
      center: true,
      cell: row => (
        <div className="text-base font-medium text-gray-900">{row.price}</div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: row => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <button className="text-black hover:text-blue-600 cursor-pointer transition">
            <RiEditFill />
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
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
        fontWeight: '600',
        fontSize: '14px',
        color: '#8B8B8B',
      },
    },
    rows: {
      style: {
        minHeight: '100px',
        borderBottom: '1px solid #E5E7EB',
      },
    },
    cells: {
      style: {
        paddingTop: '16px',
        paddingBottom: '16px',
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
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProductTable;
