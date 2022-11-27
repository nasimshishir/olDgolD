import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import AddProductModal from '../../Components/AddProductModal/AddProductModal';
import Spinner from '../../Components/Spinner/Spinner'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { FaRegTrashAlt, } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'


const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [modal, setModal] = useState(true);


    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://final-server-one.vercel.app/products?email=${user.email}`);
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='container mx-auto'>
            <div>
                <label htmlFor="product-form-modal" className="btn">Add Products</label>
            </div>

            {/* My Products */}
            <div className="overflow-x-auto w-full">
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
                            myProducts.map((product, i) =>
                                <tr>
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
                                        <button className={`btn btn-xs text-white ${product.status ? "btn-success" : "btn-error"}`}>{product.status ? "Available" : "Sold"}</button>
                                    </td>
                                    <td>
                                        {product.status ?
                                            <button className="btn btn-ghost btn-sm">{product.adStatus ? "Featured" : <RiAdvertisementLine size={24} />}</button>
                                            : <button className='btn btn-error btn-xs text-white'>Sold</button>}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-md"><FaRegTrashAlt /></button>
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
            {modal && <AddProductModal
                setModal={setModal}
                refetch={refetch}
                user={user}
            ></AddProductModal>}
        </div>
    );
};

export default MyProducts;