import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { name, image, description } = category;
    return (
        <div className='rounded-lg px-6 py-8 shadow-lg text-dark text-center bg-white'>
            <div className='flex justify-center'>
                <img src={image} alt="" />
            </div>
            <div>
                <h5 className='font-bold text-xl mb-3'>{name}</h5>
                <p className='font-sm text-sm'>{description}</p>
            </div>
            <div className='mt-5'>
                <Link to={`categories/${name}`}><button className='btn border-none rounded none text-white bg-black text-center'>View Products</button></Link>
            </div>
        </div>
    );
};

export default CategoryCard;