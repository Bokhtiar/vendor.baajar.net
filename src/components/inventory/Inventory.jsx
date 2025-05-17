import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { RiEditFill } from 'react-icons/ri';

import InventorModal from '../modal/inventoryUpdate';

const products = [
    {
        orderNo: "48956486",
        customer: "Bakhtiar Tashar",
        stock: 2,
        sold: 960,
    },
    {
        orderNo: "48956487",
        customer: "Samira Hossain",
        stock: 1,
        sold: 480,
    },
    {
        orderNo: "48956488",
        customer: "Rahim Uddin",
        stock: 3,
        sold: 1440,
    },
];

const Inventory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            name: "Name",
            selector: (row) => row.customer,
            sortable: true,
        },
        {
            name: "SKU",
            selector: (row) => row.orderNo,
            sortable: true,
        },
        {
            name: "Stock",
            selector: (row) => `${row.stock} `,
            center: true,
        },
        {
            name: "Sold",
            selector: (row) => `${row.sold}`,
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                        setSelectedProduct(row);
                        setIsOpen(true);
                    }}
                >
                    <RiEditFill className="h-5 w-5" />
                </button>
            ),
            center: true,
        },
    ];

    const customStyles = {
        header: {
            style: {
                border: "1px solid #E5E7EB", // ✅ Full border around the entire header row
                borderRadius: "6px 6px 0 0",  // (Optional) Rounded top corners

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

    return (
        <div className="w-full p-4  relative">
            <DataTable
                columns={columns}
                data={products}
                customStyles={customStyles}
                pagination
                highlightOnHover
                responsive
            />

            {isOpen && selectedProduct && (
                <InventorModal
                    isOpen={isOpen}
                    product={selectedProduct}
                    onClose={() => {
                        setIsOpen(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </div>
    );
};

export default Inventory;
