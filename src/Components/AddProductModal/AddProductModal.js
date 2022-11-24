import React from 'react';
import { useForm } from 'react-hook-form'


const AddProductModal = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center">Add Product for Sale</h3>
                    {/* Form */}
                    <form onSubmit={handleSubmit()} className='my-5'>
                        <div className='py-3'>
                            <input
                                {...register("email", { required: 'Email is required' })}
                                type="email" placeholder="email" className="input input-bordered w-full" />
                            {errors.email && <p className='text-right text-red-600 my-1 text-xs'>{errors.email?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("password",
                                    {
                                        required: 'Passwrd is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters required' }
                                    })}
                                type="password" placeholder="password" className="input input-bordered w-full" />
                            {errors.password && <p className='text-right text-red-600 my-1 text-xs'>{errors.password?.message}</p>}
                        </div>

                        <input className='btn bg-slate-700 w-full py-3' type='submit' value='Login' />
                    </form>

                </div>
            </div>

        </>
    );
};

export default AddProductModal;