import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import DetailsSkeleton from "../../components/Skeleton/DetailsSkeleton";

const ReturnDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Return.show(id);
      if (response?.status === 200) {
        setReturnData(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading || !returnData) {
    return <DetailsSkeleton />;
  }

  const photos = returnData.photo ? JSON.parse(returnData.photo) : [];
  const { order_item, user, status, reason, notes, created_at } = returnData;
  const { product } = order_item;

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-[#8B8B8B]">Return Request Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Info */}
        <div className="space-y-4 shadow p-4 rounded-md">
          <h3 className="text-lg font-semibold text-[#8B8B8B]">Product Info</h3>

          <p>
            <span className="text-[#8B8B8B] font-medium">Name:</span> {product?.product_name}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Price:</span> ৳{order_item?.price}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Total:</span> ৳{order_item?.total}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Short Description:</span>{" "}
            {product?.short_description}
          </p>

          <div>
            <span className="text-[#8B8B8B] font-medium">Product Images:</span>
            <div className="flex gap-2 mt-2 flex-wrap">
              {product?.product_image?.map((img, i) => (
                <img
                  key={i}
                  src={`${import.meta.env.VITE_API_SERVER}${img}`}
                  alt={`product-${i}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-4 shadow p-4 rounded-md">
          <h3 className="text-lg font-semibold text-[#8B8B8B]">Customer Info</h3>

          <p>
            <span className="text-[#8B8B8B] font-medium">Name:</span> {user?.name}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Phone:</span> {user?.phone}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Role:</span> {user?.role}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Status:</span> {status}
          </p>
          <p>
            <span className="text-[#8B8B8B] font-medium">Requested At:</span>{" "}
            {new Date(created_at).toLocaleString()}
          </p>

          <div>
            <span className="text-[#8B8B8B] font-medium">Customer Image:</span>
            <div className="mt-2">
              <img
                src={`${import.meta.env.VITE_API_SERVER}${user?.image}`}
                alt="Customer"
                className="w-16 h-16 rounded-full border"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reason & Notes */}
      <div className="shadow rounded-md p-4 space-y-2">
        <h3 className="text-lg font-semibold text-[#8B8B8B]">Return Reason & Notes</h3>
        <p>
          <span className="text-[#8B8B8B] font-medium">Reason:</span> {reason || "N/A"}
        </p>
        <p>
          <span className="text-[#8B8B8B] font-medium">Notes:</span> {notes || "N/A"}
        </p>
      </div>

      {/* Return Photos */}
      {photos.length > 0 && (
        <div className="shadow rounded-md p-4">
          <h3 className="text-lg font-semibold text-[#8B8B8B]">Return Photos</h3>
          <div className="flex gap-3 mt-2 flex-wrap">
            {photos.map((img, idx) => (
              <img
                key={idx}
                src={`${import.meta.env.VITE_API_SERVER}${img}`}
                alt={`return-${idx}`}
                className="w-24 h-24 object-cover border rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnDetails;
