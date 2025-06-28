import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";
import Orders from "../../components/orders/Order";
import { useLocation } from "react-router-dom";


// Main component
const AllOrderList = () => {
    const location = useLocation();
   console.log("location",location)

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); 
console.log(status);
  return (
   
     <Orders status={status}/>

  );
};

export default AllOrderList;
