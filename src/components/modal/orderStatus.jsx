import React from 'react';

const OrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const orderStates = ['Pending', 'Processed', 'Shipped', 'Delivered', 'Cancel'];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 px-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-h-screen flex items-center justify-center py-8"
      >
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md md:max-w-2xl shadow-lg relative">
          <div className="mb-4 space-y-4">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between gap-4 text-sm font-medium">
              <div>
                <div className="text-gray-500">Date:</div>
                <div>{order?.date}</div>
              </div>
              <div>
                <div className="text-gray-500">Order ID:</div>
                <div>{order?.orderNo}</div>
              </div>
              <div>
                <div className="text-gray-500">Customer:</div>
                <div>{order?.customer}</div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="text-gray-600 font-semibold mb-2 text-base">Product Details</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-gray-200 rounded-lg">
                <img
                  src="/image/products/image.svg"
                  alt="product"
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="text-sm flex flex-col sm:flex-row justify-between w-full gap-4">
                  <div>
                    <p>Product Name:</p>
                    <p className="font-semibold">MB Undershirt For Men</p>
                  </div>
                  <div>
                    <p>Quantity:</p>
                    <p className="text-center font-semibold">2</p>
                  </div>
                  <div>
                    <p>Total Price:</p>
                    <p className="text-center font-semibold">480</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status Buttons */}
          <div className="text-center mt-6">
            <h4 className="text-gray-600 mb-3 font-medium">Update the Order State</h4>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {orderStates.map((state) => (
                <button
                  key={state}
                  onClick={() => console.log(`${state} clicked`)}
                  className={`px-4 py-2 rounded-full ${
                    state === 'Pending'
                      ? 'bg-[#FF6600] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
