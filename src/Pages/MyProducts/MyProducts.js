import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import AddProductModal from '../../Components/AddProductModal/AddProductModal';
// import Spinner from '../../Components/Spinner/Spinner'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [modal, setModal] = useState(true);


    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user.email}`);
            const data = await res.json();
            return data
        }
    });

    // if (isLoading) {
    //     return <Spinner></Spinner>
    // }
    return (
        <div>
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
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myProducts.map((product, i) => <tr>
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
                                            <div className="text-sm opacity-50">{product.model}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product.category}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{product.status}</span>
                                </td>
                                <td>{product.price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
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