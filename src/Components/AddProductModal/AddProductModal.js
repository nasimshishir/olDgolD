import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';


const AddProductModal = ({ setModal, user, userInfo, refetch }) => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const { data: categories = [] } = useQuery({
        queryKey: ['categoires',],
        queryFn: async () => {
            const res = await fetch('https://final-server-one.vercel.app/categories');
            const data = await res.json();
            return data
        }
    });

    const handleAddProduct = data => {

        const date = format(new Date(), 'PP');


        const product = {
            postDate: date,
            brand: data.brand,
            model: data.model,
            image: data.image,
            category: data.category,
            price: data.resalePrice,
            orginalPrice: data.originalPrice,
            location: data.location,
            usedDuration: data.usedDuration,
            condition: data.condition,
            description: data.description,
            sellerName: user.displayName,
            sellerPhone: data.sellerPhone,
            sellerEmail: user.email,
            sellerStatus: userInfo.verified,
            status: true,
            adStatus: false
        }

        fetch('https://final-server-one.vercel.app/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                setModal(false);
                toast.success('Your product has been added');
                refetch()
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <input type="checkbox" id="product-form-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-form-modal" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                    <h3 className="text-xl font-bold text-center">Add Product for Sale</h3>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleAddProduct)} className='my-5'>

                        <div className='py-2'>
                            <input
                                {...register("brand", { required: 'This Field is required' })}
                                type="text" placeholder="Brand" className="input input-bordered w-full input-sm" />
                            {errors.brand && <p className='text-right text-red-600 my-1 text-xs'>{errors.brand?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("model", { required: 'This Field is required' })}
                                type="text" placeholder="Model" className="input input-bordered w-full input-sm" />
                            {errors.model && <p className='text-right text-red-600 my-1 text-xs'>{errors.model?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <select {...register("category", { required: 'This Field is required' })} className="select select-bordered select-sm w-full" placeholder='Select category'>
                                <option value="">Select category...</option>
                                {
                                    categories.map((category, i) => <option key={i} value={category.name}>{category.name}</option>)
                                }

                            </select>
                            {errors.category && <p className='text-right text-red-600 my-1 text-xs'>{errors.category?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("image", { required: 'This Field is required' })}
                                type="text" placeholder="Photo url" className="input input-bordered w-full input-sm" />
                            {errors.image && <p className='text-right text-red-600 my-1 text-xs'>{errors.image?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("location", { required: 'This Field is required' })}
                                type="text" placeholder="Location" className="input input-bordered w-full input-sm" />
                            {errors.location && <p className='text-right text-red-600 my-1 text-xs'>{errors.location?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("resalePrice", { required: 'This Field is required' })}
                                type="number" placeholder="Your selling price" className="input input-bordered w-full input-sm" />
                            {errors.resalePrice && <p className='text-right text-red-600 my-1 text-xs'>{errors.resalePrice?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("originalPrice", { required: 'This Field is required' })}
                                type="number" placeholder="Original price" className="input input-bordered w-full input-sm" />
                            {errors.originalPrice && <p className='text-right text-red-600 my-1 text-xs'>{errors.originalPrice?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("usedDuration", { required: 'This Field is required' })}
                                type="text" placeholder="How long you've used it?" className="input input-bordered w-full input-sm" />
                            {errors.usedDuration && <p className='text-right text-red-600 my-1 text-xs'>{errors.usedDuration?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <select {...register("condition", { required: 'This Field is required' })} className="select select-bordered select-sm w-full" placeholder='Condition'>
                                <option value="">Select condition...</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                            {errors.condition && <p className='text-right text-red-600 my-1 text-xs'>{errors.condition?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <textarea
                                {...register("description", { required: 'This Field is required' })}
                                type="text" placeholder="Description" className="input input-bordered w-full input-sm" />
                            {errors.description && <p className='text-right text-red-600 my-1 text-xs'>{errors.description?.message}</p>}
                        </div>
                        <div className='py-2'>
                            <input
                                {...register("sellerPhone", { required: 'This Field is required' })}
                                type="number" placeholder="Your phone number" className="input input-bordered w-full input-sm" />
                            {errors.sellerPhone && <p className='text-right text-red-600 my-1 text-xs'>{errors.sellerPhone?.message}</p>}
                        </div>
                        <input className='btn bg-slate-700 w-full py-3 mt-6' type='submit' value='Add Product' />
                    </form>

                </div>
            </div>

        </div>
    );
};

export default AddProductModal;