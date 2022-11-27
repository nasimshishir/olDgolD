import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import AddProductModal from '../../Components/AddProductModal/AddProductModal';
import Spinner from '../../Components/Spinner/Spinner'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { FaRegTrashAlt, } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';


const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [addProductModal, setAddProductModal] = useState(true);
    const [delProduct, setDelProduct] = useState(null);
    const [updProduct, setUpdProduct] = useState(null);

    const closeModal = () => {
        setDelProduct(null);
        setUpdProduct(null)
    }

    // const { data: userInfo = {} } = useQuery({
    //     queryKey: ['user', user?.email],
    //     queryFn: async () => {
    //         const res = await fetch(`https://final-server-one.vercel.app/user?email=${user?.email}`);
    //         const data = await res.json();
    //         return data
    //     }
    // });


    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://final-server-one.vercel.app/products?email=${user.email}`);
            const data = await res.json();
            return data
        }
    });

    const handleDeleteProduct = (product) => {
        fetch(`https://final-server-one.vercel.app/product/${product._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.brand} deleted successfully`)
                }
            })
    }

    const handleUpdateProduct = (product) => {
        fetch(`https://final-server-one.vercel.app/product/${product._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ status: !product.status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Congrates! Your products is Sold!`)
                }
            })

    }

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='container mx-auto'>
            <div className='flex justify-end'>
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
                                        <label onClick={() => { setUpdProduct(product) }} className={`btn btn-xs text-white ${product.status ? "btn-success" : "btn-error"}`} htmlFor="confirmation-modal">{product.status ? "Available" : "Sold"}</label>
                                    </td>
                                    <td>
                                        {product.status ?
                                            <button className="btn btn-ghost btn-sm">{product.adStatus ? "Featured" : <RiAdvertisementLine size={24} />}</button>
                                            : <button className='btn btn-error btn-xs text-white'>Sold</button>}
                                    </td>
                                    <td>
                                        <label onClick={() => setDelProduct(product)} htmlFor="confirmation-modal" className="btn btn-ghost btn-md"><FaRegTrashAlt /></label>
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
            {addProductModal && <AddProductModal
                setModal={setAddProductModal}
                refetch={refetch}
                user={user}
            // userInfo={userInfo}
            ></AddProductModal>}

            {/* Delete Modal Body */}
            {delProduct && <ConfirmationModal
                title={`Are you sure you want to delete ${delProduct.brand}?`}
                message={`If you delete ${delProduct.brand}. It cannot be undone.`}
                actionButtonName={"Delete"}
                closeModal={closeModal}
                actionData={delProduct}
                actionFunction={handleDeleteProduct}
            ></ConfirmationModal>
            }
            {updProduct && <ConfirmationModal
                title={`Are you sure ${updProduct.brand} is sold?`}
                message={`If you confirm , it cannot be undone!`}
                actionButtonName={"Confirm"}
                closeModal={closeModal}
                actionData={updProduct}
                actionFunction={handleUpdateProduct}
            ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;