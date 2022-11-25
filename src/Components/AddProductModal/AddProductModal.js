import React from 'react';
import { useForm } from 'react-hook-form'


const AddProductModal = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleAddProduct = data => {
        console.log(data);

    }

    return (
        <>
            <input type="checkbox" id="product-form-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-form-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center">Add Product for Sale</h3>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleAddProduct)} className='my-5'>

                        <div className='py-3'>
                            <input
                                {...register("brand", { required: 'This Field is required' })}
                                type="text" placeholder="Brand" className="input input-bordered w-full" />
                            {errors.brand && <p className='text-right text-red-600 my-1 text-xs'>{errors.brand?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("model", { required: 'This Field is required' })}
                                type="text" placeholder="Model" className="input input-bordered w-full" />
                            {errors.model && <p className='text-right text-red-600 my-1 text-xs'>{errors.model?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <select {...register("category", { required: 'This Field is required' })} className="select select-bordered w-full" placeholder='Select category'>
                                <option value="">Select category...</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                            {errors.category && <p className='text-right text-red-600 my-1 text-xs'>{errors.category?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("image", { required: 'This Field is required' })}
                                type="text" placeholder="Photo url" className="input input-bordered w-full" />
                            {errors.image && <p className='text-right text-red-600 my-1 text-xs'>{errors.image?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("location", { required: 'This Field is required' })}
                                type="text" placeholder="Location" className="input input-bordered w-full" />
                            {errors.location && <p className='text-right text-red-600 my-1 text-xs'>{errors.location?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("resalePrice", { required: 'This Field is required' })}
                                type="number" placeholder="Your selling price" className="input input-bordered w-full" />
                            {errors.resalePrice && <p className='text-right text-red-600 my-1 text-xs'>{errors.resalePrice?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("originalPrice", { required: 'This Field is required' })}
                                type="number" placeholder="Original price" className="input input-bordered w-full" />
                            {errors.originalPrice && <p className='text-right text-red-600 my-1 text-xs'>{errors.originalPrice?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("usedDuration", { required: 'This Field is required' })}
                                type="text" placeholder="How long you've used it?" className="input input-bordered w-full" />
                            {errors.usedDuration && <p className='text-right text-red-600 my-1 text-xs'>{errors.usedDuration?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <select {...register("condition", { required: 'This Field is required' })} className="select select-bordered w-full" placeholder='Condition'>
                                <option value="">Select condition...</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                            {errors.condition && <p className='text-right text-red-600 my-1 text-xs'>{errors.condition?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <textarea
                                {...register("description", { required: 'This Field is required' })}
                                type="text" placeholder="Description" className="input input-bordered w-full" />
                            {errors.description && <p className='text-right text-red-600 my-1 text-xs'>{errors.description?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("sellerPhone", { required: 'This Field is required' })}
                                type="number" placeholder="Your phone number" className="input input-bordered w-full" />
                            {errors.sellerPhone && <p className='text-right text-red-600 my-1 text-xs'>{errors.sellerPhone?.message}</p>}
                        </div>
                        <input className='btn bg-slate-700 w-full py-3' type='submit' value='Add Product' />
                    </form>

                </div>
            </div>

        </>
    );
};

export default AddProductModal;