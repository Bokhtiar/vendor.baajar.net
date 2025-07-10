import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { RiEditFill } from "react-icons/ri";
import OrderModal from "../modal/orderStatus";
import { OrderTableSkeleton } from "../Skeleton/Skeleton";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";

const getStatusBadge = (status) => {
  const colorMap = {
    pending: "bg-[#FF6600] text-white",
    shipped: "bg-[#A600FF] text-white",
    delivered: "bg-[#13BF00] text-white",
    cancelled: "bg-[#DC2626] text-white",
    processing: "bg-[#3ABFEF] text-white",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs w-24 h-6 text-center leading-4 ${
        colorMap[status] || "bg-gray-300 text-black"
      }`}
    >
      {status}
    </span>
  );
};

const Orders = ({ status }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  console.log("status", status);

  // Fetch categories from API
  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      if (status) {
        queryParams.append("order_status", status);
      }
      // if (search) {
      //   queryParams.append("search", search);
      // }
      const response = await NetworkServices.Order.index(
        queryParams.toString()
      );
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data?.data || []);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage,perPage,status]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // const filteredOrders = status
  //   ? data.filter((order) => order.status === status)
  //   : data;

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <span className="font-medium">
          {String(index + 1).padStart(2, "0")}.
        </span>
      ),
      width: "70px",
      center: true,
    },
    {
      name: "Date & Time",
      sortable: true,
      cell: (row) => {
        const dateObj = new Date(row.created_at);

        const date = dateObj.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const time = dateObj.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        return (
          <div className="flex flex-col leading-tight">
            <span>{date}</span>
            <span className="text-sm text-gray-500">{time}</span>
          </div>
        );
      },
    },

    { name: "Customer", selector: (row) => row?.order?.user?.name },
    { name: "Order No", selector: (row) => row.id },
    {
      name: "Quantity",
      cell: (row) => <div>{row.quantity} Pcs</div>,
      center: true,
    },
    {
      name: "Price",
      selector: (row) => `${row.total}`,
      center: true,
    },
    {
      name: "Order Status",
      cell: (row) => getStatusBadge(row.status),
      center: true,
    },
    {
      name: "Payment",
      cell: (row) => row.order.payment_method,
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
    <div className="w-full  font-poppins relative">
      {loading ? (
        <OrderTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          highlightOnHover
          responsive
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationDefaultPage={currentPage}
        />
      )}

      {isOpen && selectedOrder && (
        <OrderModal
          isOpen={isOpen}
          fetchOrder={fetchOrder}
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
