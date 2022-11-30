import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import Verified from '../Icons/Verified';

const ProductCard = ({ product }) => {
    const { _id, brand, model, image, price, condition, sellerName, location, postDate, orginalPrice, category, usedDuration, status, sellerStatus, adStatus } = product;

    const [bookingModal, setBookingModal] = useState(status)

    return (
        <div className='px-5'>
            <div className="card bg-white shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className='flex justify-between align-middle'>
                        <div>
                            <span className="text-lg font-bold">{brand}</span>
                            <span className='text-slate-400'><small> -{model} </small></span>
                            {adStatus && <span className="badge badge-secondary">  Featured</span>}
                        </div>
                        <div>
                            <p className='font-semibold'>${price}</p>
                        </div>
                    </div>
                    <p><span>{sellerName}</span> <span>{sellerStatus && < Verified />}</span></p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline"><small className='font-medium'>{category}</small></div>
                    </div>
                    <div>
                        <label htmlFor='booking-form-modal' className='btn btn-md'>Book Now</label>
                    </div>
                </div>
            </div>
            {status && bookingModal &&
                <BookingModal
                    setBookingModal={setBookingModal}
                    product={product}
                ></BookingModal>}
        </div>
    );
};

export default ProductCard;