import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../Components/Spinner/Spinner';
import { FaRegTrashAlt } from 'react-icons/fa'


const Sellers = () => {
    const [verifyUser, setVerifyUser] = useState(null);
    const [delUser, setDelUser] = useState(null);

    const closeModal = () => {
        setVerifyUser(null);
        setDelUser(null)
    }

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['Users', 'Seller'],
        queryFn: async () => {
            const res = await fetch('https://final-server-one.vercel.app/users?userRole=Seller')
            const data = await res.json();
            return data
        }
    });


    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='conatiner mx-auto py-16'>

            {/* Sellers*/}
            <div className="overflow-x-auto w-full">
                <div className='my-10'>
                    <h5 className='text-4xl text-center font-bold'>Sellers</h5>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) =>
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
                                                    <img src={seller.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{seller.brand}</div>
                                                <div className="text-sm opacity-50">Model: {seller.model}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {seller.category}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Price: ${seller.price}</span>
                                    </td>
                                    <td>
                                        {seller.category}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Price: ${seller.price}</span>
                                    </td>
                                    <td>
                                        {seller.status ? <label onClick={() => { setVerifyUser(seller) }} className='btn btn-xs text-white btn-success' htmlFor="confirmation-modal">Available</label> :
                                            <button className='btn btn-xs btn-error text-white'>Sold</button>}
                                    </td>
                                    <td>
                                        <label onClick={() => setDelUser(seller)} htmlFor="confirmation-modal" className="btn btn-ghost btn-md"><FaRegTrashAlt /></label>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>




        </div>
    );
};

export default Sellers;