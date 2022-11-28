import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa'
import Spinner from '../../Components/Spinner/Spinner';

const Users = () => {

    const [verifyUser, setVerifyUser] = useState(null);
    const [delUser, setDelUser] = useState(null);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['products',],
        queryFn: async () => {
            const res = await fetch('https://final-server-one.vercel.app/users');
            const data = await res.json();
            return data
        }
    });


    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>

            {/* Sellers*/}
            {/* My Products */}
            <div className="overflow-x-auto w-full">
                <div className='my-10'>
                    <h5 className='text-4xl text-center font-bold'>My Products</h5>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((product, i) =>
                                <tr key={i}>
                                    <th>
                                        <label>
                                            <p>{i + 1}</p>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.brand}</div>
                                                <div className="text-sm opacity-50">Model: {product.model}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product.category}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Price: ${product.price}</span>
                                    </td>
                                    <td>
                                        {product.status ? <label onClick={() => { setVerifyUser(product) }} className='btn btn-xs text-white btn-success' htmlFor="confirmation-modal">Available</label> :
                                            <button className='btn btn-xs btn-error text-white'>Sold</button>}
                                    </td>
                                    <td>
                                        <label onClick={() => setDelUser(product)} htmlFor="confirmation-modal" className="btn btn-ghost btn-md"><FaRegTrashAlt /></label>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
};

export default Users;