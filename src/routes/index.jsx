import Details from "../components/orders/details";
import { DashboardLayout } from "../layouts/dashboard.layout";
import CategoryShow from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
import Earning from "../pages/earning";
import Withdrawal from "../pages/earning/Withdrawal";
import Inventory from "../pages/inventory";

import AllOrderList from "../pages/order";
import Orders from "../pages/order";
import CanceledOrder from "../pages/order/Cencel-order";

import CompletedOrder from "../pages/order/Completed-order";
import PendingOrders from "../pages/order/pending-order";
import ProcessedOrder from "../pages/order/processed-order";
import ShippedOrder from "../pages/order/shipped-order";
import Products from "../pages/products";
import ProductCreate from "../pages/products/Create";
import ProductUpdate from "../pages/products/edit";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";

import { getToken } from "../utils/helpers";

const appRoutes = [
  {
    path: "/dashboard",  // Ensure the path is absolute
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },  // This will render at /dashboard
      { path: "category", element: <CategoryShow /> },
      { path: "orders", element: <AllOrderList /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductUpdate /> },
      { path: "inventory", element: <Inventory /> },
      { path: "earnings", element: <Earning /> },
      { path: "create-product", element: <ProductCreate/> },  
      // { path: "stock-out", element: <StockOut/> },  
      { path: "pending-orders", element: <PendingOrders/> }, 
      { path: "processed-orders", element: <ProcessedOrder/> }, 
      { path: "shipped-orders", element: <ShippedOrder/> }, 
      { path: "completed-orders", element: <CompletedOrder/> },  
      { path: "canceled-orders", element: <CanceledOrder/> },  
      { path: "orders/:id", element: <Details/> },  
      { path: "withdrawal", element: <Withdrawal/> },  
      { path: "profile", element: <Profile/> },  
      { path: "reset-password", element: <ResetPassword/> },
    ],
  },
];

export const permittedRoutes = () => {
  const token = getToken();
  if (token) {
    return appRoutes;
  }
  return [];
};
