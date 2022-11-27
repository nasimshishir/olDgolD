import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import { GoVerified } from 'react-icons/go'

const ProductCard = ({ product }) => {
    const { _id, brand, image, price, condition, sellerName, location, postDate, orginalPrice
        , usedDuration, status, sellerStatus } = product;

    const [bookingModal, setBookingModal] = useState(status)
    return (
        <div>
            <div className="card bg-base-200 shadow-xl p-5">
                <div className='flex justify-between mb-2'>
                    <h2 className="text-2xl font-semibold">{brand}</h2>
                    <h1 className='text-3xl font-bold text-primary'>{price}tk</h1>
                </div>

                <img src={image} alt="" className="rounded-xl" />

                <p className='badge badge-primary text-white mt-3'>Condition: {condition}</p>

                <div className='mt-3 flex'>
                    <p className='text-xl font-semibold text-accent'>Seller: {sellerName}{sellerStatus ? <GoVerified value={{ color: 'blue', size: '20px' }} /> : ""}</p>
                    {/* {
                        verifySeller ?
                            <p> < BsPatchCheckFill color="cornflowerblue" /> </p> : <p> </p>
                    } */}
                </div>
                <p className='text-sm text-slate-400'>Posted on {postDate}</p>

                <div className="mt-3">
                    <p><span className=' font-semibold'>Pick Up Point:</span> {location}</p>
                    <p><span className=' font-semibold'>Original Price:</span> {orginalPrice
                    }tk</p>
                    <p><span className=' font-semibold'>Years of use:</span> {usedDuration}</p>
                    <label
                        onClick={() => setBookingModal(_id)} htmlFor="booking-form-modal"
                        className={`mt-3 btn ${status ? "btn-outline" : "btn-error btn-sm"}`}
                    >{status ? "Book Item" : "Sold"}</label>
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