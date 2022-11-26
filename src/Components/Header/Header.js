import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import logo from '../../assets/images/logo.png'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
    }
    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
    </>

    const userMenu = <>
        {/* {user.userRole === "Seller" && <li><Link to="/dashboard/myproducts">Dashboard</Link></li>} */}
        {/* {user.userRole === "Buyer" && <li><Link to="/dashboard/mybookings">Dashboard</Link></li>} */}
        {/* {user.userRole === "Admin" && <li><Link to="/dashboard/myusers">Dashboard</Link></li>} */}

        <li><button className='btn btn-outline' onClick={handleLogOut}>Logout</button></li>
    </>
    return (
        <div className='bg-slate-100 shadow-lg sticky top-0 z-10'>
            <div className=''>
                <div className="navbar">
                    {/* mobile Nav */}
                    <div className='dropdown'>
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                            <li className='border-t'><Link to="/login">Login</Link></li>
                            <li className='border-t'><Link to="/register">Register</Link></li>
                        </ul>

                    </div>
                    <div className="flex-1">
                        <Link to='/' className="btn btn-ghost normal-case text-xl"><img className='max-w-[50px]' src={logo} alt="" srcset="" /></Link>
                        <Link to='/' className="btn btn-ghost normal-case text-xl">olDgolD</Link>
                    </div>
                    {/* Desktop Nav */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                    </div>

                    {/* User Profile Bubble */}

                    {
                        user ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                {userMenu}
                            </ul>
                        </div>
                            :
                            <div className='hidden lg:block'>
                                <Link to="/login"><button className='btn mx-2'>Login</button></Link>
                                <Link to="/register"><button className='btn mx-2'>Register</button></Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;