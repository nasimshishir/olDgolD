import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../Components/Spinner/Spinner';
import { FaRegTrashAlt } from 'react-icons/fa'

const Buyers = () => {
    const [delUser, setDelUser] = useState(null);

    const closeModal = () => {
        setDelUser(null)
    }

    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['Users', 'Buyer'],
        queryFn: async () => {
            const res = await fetch('https://final-server-one.vercel.app/users?userRole=Buyer')
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
                    <h5 className='text-4xl text-center font-bold'>Buyers</h5>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            buyers.map((buyer, i) =>
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
                                                    <img src={buyer.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{buyer.brand}</div>
                                                <div className="text-sm opacity-50">Model: {buyer.model}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {buyer.category}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Price: ${buyer.price}</span>
                                    </td>
                                    <td>
                                        {buyer.category}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Price: ${buyer.price}</span>
                                    </td>

                                    <td>
                                        <label onClick={() => setDelUser(buyer)} htmlFor="confirmation-modal" className="btn btn-ghost btn-md"><FaRegTrashAlt /></label>
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
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>




        </div>
    );
};

export default Buyers;