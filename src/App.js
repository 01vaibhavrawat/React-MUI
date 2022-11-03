import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/login.test";
import PersistentDrawerLeft from "./components/sidebar/SideBar";
import ProductList from "./components/productlist/ProductList.test2";
import Users from "./components/users/Users";
import Categories from "./components/categories/Categories";
import Banners from "./components/banners/Banners";
import AddProd from "./components/addProduct/AddProd";
import AddBanner from "./components/addBanner/AddBanner";
import AddUser from "./components/addUser/AddUser";
import AddCategory from "./components/addCategory/AddCategory";
import Dashboard from "./components/dashboard/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const success = (msg) => toast.success(msg);
export const error = (msg) => toast.error(msg ? msg : 'Something went wrong.');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<PersistentDrawerLeft />} >
            <Route path="productlist" element={<ProductList />} />
            <Route path="addproduct" element={<AddProd />} />
            <Route path="productlist/addproduct" element={<AddProd />} />
            <Route path="banners" element={<Banners />} />
            <Route path="addbanner" element={<AddBanner />} />
            <Route path="banners/addbanner" element={<AddBanner />} />
            <Route path="users" element={<Users />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="users/adduser" element={<AddUser />} />
            <Route path="categories" element={<Categories />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="categories/addcategory" element={<AddCategory />} />
            <Route path="$" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='top-right'
      />
    </div>
  )
}

export default App;
