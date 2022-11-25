import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Products = () => {
    const products = useLoaderData();
    return (
        <div className='container mx-auto'>
            <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }

            </div>
        </div>
    );
};

export default Products;