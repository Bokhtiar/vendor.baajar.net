import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { FaEye } from "react-icons/fa";
import EarningStats from "../../components/earning-stats/earningStats";
import { EarningsTableSkeleton } from "../../components/Skeleton/Skeleton";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import WithdrowModal from "./withdrawPopup";

const customStyles = {
  header: {
    style: {
      border: "1px solid #E5E7EB", // ✅ Full border around the entire header row
      borderRadius: "6px 6px 0 0", // (Optional) Rounded top corners
    },
  },
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

const Earning = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      const response = await NetworkServices.Earning.history(
        queryParams.toString()
      );
      console.log("rda", response);
      if (response?.status === 200) {
        setData(response?.data?.data?.data);
        setTotalRows(response?.data?.data?.total || 0);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    document.title = "Vendor | Earning ";
  }, []);
  const columns = [
    {
      name: "SN",
      selector: (row, index) => `0${index + 1}.`,
      width: "100px",
    },
    {
      name: "Method",
      selector: (row) => row.withdraw_method,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.account_number,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      // right: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <button className="text-gray-600 hover:text-black">
    //       <FaEye size={16} />
    //     </button>
    //   ),
    //   center: true,
    // },
  ];
  return (
    <div className="">
      {/* Stats Summary */}
      <EarningStats setShowModal={setShowModal} />



      {/* Data Table */}
      <div className="font-poppins pt-5">
        <h2 className="text-lg  font-semibold text-[#8B8B8B] mb-3">
          Earning Details
        </h2>
        {loading ? (
          <EarningsTableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            highlightOnHover
            responsive
            dense
            noHeader
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationDefaultPage={currentPage}
          />
        )}
      </div>
      {showModal && (
        <WithdrowModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
          // fetchColor={fetchColor}
        />
      )}
    </div>
  );
};

export default Earning;
