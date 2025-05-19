import React from 'react';
import { useLocation } from 'react-router-dom';
import Orders from '../../components/orders/Order';

const CompletedOrder = () => {
   const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); // ⬅️ get `status` from URL
console.log(status);
  return (
    <div>
      <Orders status={status} />
    </div>
  );
};

export default CompletedOrder;