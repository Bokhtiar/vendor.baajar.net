import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { RiEditFill } from "react-icons/ri";
import OrderModal from "../modal/orderStatus";

const getStatusBadge = (status) => {
  const colorMap = {
    pending: "bg-[#FF6600] text-white",
    shipped: "bg-[#A600FF] text-white",
    delivered: "bg-[#13BF00] text-white",
    cancelled: "bg-[#DC2626] text-white",
    processed: "bg-[#3ABFEF] text-white",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colorMap[status] || "bg-gray-300 text-black"}`}>
      {status}
    </span>
  );
};

const allOrders = [
  {
    date: "26 Apr 25",
    time: "10.30 AM",
    orderNo: "48956486",
    customer: "Bakhtiar Tashar",
    quantity: 2,
    price: 960,
    status: "pending",
    payment: "Unpaid",
  },
  {
    date: "24 Apr 25",
    time: "12.15 PM",
    orderNo: "48956487",
    customer: "Samira Hossain",
    quantity: 1,
    price: 480,
    status: "delivered",
    payment: "Paid",
  },
  {
    date: "23 Apr 25",
    time: "09.45 AM",
    orderNo: "48956488",
    customer: "Rahim Uddin",
    quantity: 3,
    price: 1440,
    status: "shipped",
    payment: "Paid",
  },
  {
    date: "23 Apr 25",
    time: "09.45 AM",
    orderNo: "48956488",
    customer: "Rahim Uddin",
    quantity: 3,
    price: 1440,
    status: "processed",
    payment: "Paid",
  },
  {
    date: "22 Apr 25",
    time: "03.20 PM",
    orderNo: "48956489",
    customer: "Tania Akter",
    quantity: 1,
    price: 480,
    status: "cancelled",
    payment: "Refunded",
  },
];

const Orders = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = status
    ? allOrders.filter((order) => order.status === status)
    : allOrders;

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <span className="font-medium">{String(index + 1).padStart(2, "0")}.</span>
      ),
      width: "70px",
      center: true,
    },
    {
      name: "Date",
      sortable: true,
      cell: (row) => <div>{row.date}</div>,
    },
    { name: "Customer", selector: (row) => row.customer },
    { name: "Order No", selector: (row) => row.orderNo },
    {
      name: "Quantity",
      cell: (row) => <div>{row.quantity} Pcs</div>,
      center: true,
    },
    {
      name: "Price",
      selector: (row) => `${row.price}`,
      center: true,
    },
    {
      name: "Order Status",
      cell: (row) => getStatusBadge(row.status),
      center: true,
    },
    {
      name: "Payment",
      cell: (row) => row.payment,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="cursor-pointer"
            onClick={() => {
              setSelectedOrder(row);
              setIsOpen(true);
            }}
          >
            <RiEditFill className="h-5 w-5" />
          </button>
          <button className="cursor-pointer">
            <img className="h-5" src="/image/Vector.svg" alt="delete" />
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
        color: "#6B7280",
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        borderBottom: "1px solid #E5E7EB",
      },
    },
    cells: {
      style: {
        paddingTop: "14px",
        paddingBottom: "14px",
      },
    },
  };

  return (
    <div className="w-full p-4  relative">
      <DataTable
        columns={columns}
        data={filteredOrders}
        customStyles={customStyles}
        pagination
        highlightOnHover
        responsive
      />

      {isOpen && selectedOrder && (
        <OrderModal
          isOpen={isOpen}
          order={selectedOrder}
          onClose={() => {
            setIsOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Orders;
