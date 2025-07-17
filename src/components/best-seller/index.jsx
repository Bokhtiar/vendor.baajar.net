import React from 'react';
import DataTable from 'react-data-table-component';
import { FaArrowRight } from 'react-icons/fa';



// Define columns
const columns = [
  {
    name: 'Product',
    selector: row => row.name,
    sortable: true,
    cell: row => (
      <div className="flex items-center gap-2">
        <img  src={`${import.meta.env.VITE_API_SERVER}${row?.thumbnail}`} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
        <span>{row.product_name}</span>
      </div>
    ),
    grow: 2,
  },
  {
    name: 'Price',
    selector: row => row.sale_price,
    sortable: true,
  },
  {
    name: 'Sold',
    selector: row => row.sold_quantity,
    sortable: true,
  },
  {
    name: 'Profit',
    selector: row => row.total_profit,
    sortable: true,
  },
];
const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#f3f4f6', // 
      fontWeight: '600',
    },
  },
  headCells: {
    style: {
      color: '#374151', // Tailwind's gray-700
      fontSize: '14px',
    },
  },
};


const BestSellersTable = ({data}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Best Sale Products</h2>
        <a href="#" className="text-sm  text-gray-500 hover:underline flex items-center gap-5">
          More <span className="text-lg"> <FaArrowRight />
          </span>
        </a>
      </div>

      <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        responsive
        customStyles={customStyles} // ← add this line
      />
    </div>
  );
};

export default BestSellersTable;
