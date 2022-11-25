import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import Products from "../../Pages/Products/Products";
import Register from "../../Pages/Sign up/Register";
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
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            }
        ]
    }
])

export default routes;