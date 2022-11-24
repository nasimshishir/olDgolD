import React from 'react';

const CategoryCard = ({ category }) => {
    const { name, image, description } = category;
    return (
        <div className='rounded-lg px-6 py-8 shadow-lg text-dark text-center bg-white'>
            <div className='flex justify-center'>
                <img src={image} alt="" />
            </div>
            <div>
                <h5 className='font-bold text-xl my-1'>{name}</h5>
                <p className='font-sm text-sm'>{description}</p>
            </div>
        </div>
    );
};

export default CategoryCard;