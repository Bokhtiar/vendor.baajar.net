import { DashboardLayout } from "../layouts/dashboard.layout";
import CategoryShow from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
import Earning from "../pages/earning";
import Inventory from "../pages/inventory/inex";
import Orders from "../pages/order";
import Products from "../pages/products";
import Setting from "../pages/setting";  // Ensure this import is present

const appRoutes = [
  {
    path: "/dashboard",  // Ensure the path is absolute
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },  // This will render at /dashboard
      { path: "category", element: <CategoryShow /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "inventory", element: <Inventory /> },
      { path: "earnings", element: <Earning /> },
      { path: "setting", element: <Setting /> },  // Make sure this is defined
    ],
  },
];

export const permittedRoutes = () => {
  // const token = getToken();
  // if (token) {
    return appRoutes;
  // }
  // return [];
};
