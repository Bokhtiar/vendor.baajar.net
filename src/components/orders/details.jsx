import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import DetailsSkeleton from "../Skeleton/DetailsSkeleton";

const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const orderStates = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Order.show(id);
      if (response?.status === 200) {
        setOrder(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

   if(loading){
    
      return  <DetailsSkeleton></DetailsSkeleton>
    
  }
  if (!order)
    return <div className="text-center py-10">No order data found</div>;

  const { items, order: orderInfo } = order;
  const { user, rider, address, order_status } = orderInfo || {};

  return (
    <div className="p-6 space-y-6 rounded-md">
      {/* User and Rider Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User Info */}
        {/* Shipping Address */}
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#8B8B8B]">
            Shipping Address
          </h2>
          <div className="text-black">
            {" "}
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {address?.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {address?.phone}
            </p>
            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {address?.address_line1}
            </p>
            <p>
              <span className="font-medium text-gray-700">Area:</span>{" "}
              {address?.area?.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">City:</span>{" "}
              {address?.city?.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">Division:</span>
              {address?.division?.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">Country:</span>{" "}
              {address?.country}
            </p>
          </div>
        </div>

        {/* Rider Info */}
        <div className="p-4 rounded-md bg-white shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#8B8B8B]">
            Rider Information
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.VITE_API_SERVER}${rider?.profile_image}`}
              alt="rider"
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <p>
                <span className="font-medium text-gray-700">Name:</span>{" "}
                {rider?.name}
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {rider?.phone_number}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {rider?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Buttons */}
      <div className="text-center mt-6">
        <h4 className="text-gray-600 mb-3 font-medium">Order Status</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {orderStates.map((state) => (
            <button
              key={state}
              className={`px-4 py-2 rounded-full ${
                state === order_status
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Ordered Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 font-semibold text-gray-600 w-20">Image</th>
                <th className="p-3 font-semibold text-gray-600">
                  Product Name
                </th>
                <th className="p-3 font-semibold text-gray-600">Quantity</th>
                <th className="p-3 font-semibold text-gray-600">Unit Price</th>
                <th className="p-3 font-semibold text-gray-600">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items?.map((product, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <img
                      src={`${import.meta.env.VITE_API_SERVER}${
                        product?.product?.thumbnail
                      }`}
                      alt={product?.product?.product_name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{product?.product?.product_name}</td>
                  <td className="p-2">{product?.quantity}</td>
                  <td className="p-2">৳{product?.price}</td>
                  <td className="p-2">৳{product?.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
