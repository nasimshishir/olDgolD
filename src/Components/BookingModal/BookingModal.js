import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const BookingModal = ({ product, setBookingModal }) => {
    const { brand, model, price, status, adStatus } = product;
    const { user } = useContext(AuthContext);


    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleBooking = data => {
        const bookingData = {
            productBrand: brand,
            productModel: model,
            price,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyerPhone: data.buyerPhone,
            availableStatus: status,
            adStatus,
            paymentStatus: false
        }
        fetch('https://final-server-one.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Booking has been confirmed');
                setBookingModal(null)
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <input type="checkbox" id="booking-form-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-form-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-center">Book Product to Buy</h3>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleBooking)} className='my-5'>

                        <div className='py-1'>
                            <label className='label'><span className='label-text'>Name</span></label>
                            <input
                                {...register("buyerName", { required: 'This Field is required' })}
                                type="text" className="input input-bordered w-full" defaultValue={user?.displayName} disabled />
                            {errors.buyerName && <p className='text-right text-red-600 my-1 text-xs'>{errors.buyerName?.message}</p>}
                        </div>
                        <div className='py-1'>
                            <label className='label'><span className='label-text'>Email</span></label>
                            <input
                                {...register("buyerEmail", { required: 'This Field is required' })}
                                type="text" className="input input-bordered w-full" defaultValue={user?.email} disabled />
                            {errors.buyerEmail && <p className='text-right text-red-600 my-1 text-xs'>{errors.buyerEmail?.message}</p>}
                        </div>

                        <div className='py-1'>
                            <label className='label'><span className='label-text'>Phone</span></label>
                            <input
                                {...register("buyerPhone", { required: 'This Field is required' })}
                                type="text" placeholder="your phone number" className="input input-bordered w-full" />
                            {errors.buyerPhone && <p className='text-right text-red-600 my-1 text-xs'>{errors.buyerPhone?.message}</p>}
                        </div>
                        <input className='btn bg-slate-700 w-full py-3 mt-10' type='submit' value='Confirm Booking' />
                    </form>

                </div>
            </div>

        </div>
    );
};

export default BookingModal;