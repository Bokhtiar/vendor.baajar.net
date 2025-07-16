import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";
import Orders from "../../components/orders/Order";
import { useParams } from "react-router-dom";


// Main component
const AllOrderList = () => {
   const { status } = useParams();
   console.log("status", status);
   const title="Vendor | All-Order"
  return (
      <div><Orders status={status} title={title}/></div>
  );
};

export default AllOrderList;
