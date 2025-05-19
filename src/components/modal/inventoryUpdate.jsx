import React from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from '../input';


const InventorModal = ({ isOpen, onClose, product }) => {
    // ✅ Always call useForm at the top level
    const {
        control,
        trigger,
        formState: { errors },
    } = useForm();

    if (!isOpen) return null;

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
                        {/* Product Info */}
                        <div>
                            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-gray-200 rounded-lg">
                                <img
                                    src="/image/products/image.svg"
                                    alt="product"
                                    className="w-20 h-24 object-cover rounded"
                                />
                                <div className="text-sm flex flex-col sm:flex-row justify-between w-full gap-4">
                                    <div>
                                        <p className="font-semibold">{product?.customer}</p>
                                    </div>
                                    <div>
                                        <p>
                                            SKU: <strong>{product?.orderNo}</strong>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Price: <strong>200/-</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <p className="font-medium ">In Stock</p>
                        <div className="flex flex-row gap-4 items-end">
                            <TextInput
                                name="quantity"
                                control={control}
                                // rules={{ required: true }}
                                placeholder="Enter quantity"
                                type="number"
                                defaultvalue=""
                                error={errors?.quantity?.message}
                               
                                className="w-full"
                                trigger={trigger}
                            />

                            {/* Styled button as per your request */}
                            <button className="bg-primary text-white rounded-full px-5 py-1 ">
                                Update
                            </button>
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

export default InventorModal;
