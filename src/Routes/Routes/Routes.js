import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import Main from "../../Layouts/Main/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyBookings from "../../Pages/MyBookings/MyBookings";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import Products from "../../Pages/Products/Products";
import Register from "../../Pages/Sign up/Register";
import Buyers from "../../Pages/Users/Buyers/Buyers";
import Sellers from "../../Pages/Users/Sellers/Sellers";
import PrivateRoute from "../Private Routes/PrivateRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: async () => {
                    return fetch('https://final-server-one.vercel.app/categories');
                }
            },
            {
                path: '/categories/:id',
                element: <Products></Products>,
                loader: async ({ params }) => {
                    return fetch(`https://final-server-one.vercel.app/products/${params.id}`)
                }
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/mybookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/sellers',
                element: <Sellers></Sellers>
            },
            {
                path: '/dashboard/buyers',
                element: <Buyers></Buyers>
            }
        ]
    },
    {
        path: '/*',
        element: <div>404</div>
    }
])

export default routes;