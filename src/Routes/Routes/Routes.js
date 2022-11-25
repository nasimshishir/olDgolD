import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import Products from "../../Pages/Products/Products";
import Register from "../../Pages/Sign up/Register";

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
                path: '/categories/:name',
                element: <Products></Products>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/products/${params.name}`)
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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            }
        ]
    }
])

export default routes;