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
    const [updProductAd, setUpdProductAd] = useState(null);

    const closeModal = () => {
        setDelProduct(null);
        setUpdProduct(null)
        setUpdProductAd(null)
    }


    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://final-server-one.vercel.app/products?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
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
                    refetch()
                }
            })

    }

    const handleUpdateProductAd = (product) => {
        fetch(`https://final-server-one.vercel.app/productad/${product._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ adStatus: !product.adStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Congrates! Your products is Featured!`)
                    refetch()
                }
            })

    }

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='container mx-auto py-16'>
            <div className='flex justify-end'>
                <label htmlFor="product-form-modal" className="btn">Add Products</label>
            </div>

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
                                        {product.status ? <label onClick={() => { setUpdProduct(product) }} className='btn btn-xs text-white btn-success' htmlFor="confirmation-modal">Available</label> :
                                            <button className='btn btn-xs btn-error text-white'>Sold</button>}
                                    </td>
                                    <td>
                                        {product.status ?
                                            <label onClick={() => { setUpdProductAd(product) }} className={`btn btn-xs ${product.adStatus ? "btn-primary" : "btn-ghost"}`} htmlFor="confirmation-modal">{product.adStatus ? "Featured" : <RiAdvertisementLine size={24} />}</label>
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

            {updProductAd && <ConfirmationModal
                title={`Are you sure you want to run Advertise for ${updProductAd.brand}?`}
                message={`If you confirm , it will be Featured!`}
                actionButtonName={"Confirm"}
                closeModal={closeModal}
                actionData={updProductAd}
                actionFunction={handleUpdateProductAd}
            ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;