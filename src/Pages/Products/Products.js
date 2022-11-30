import { useLoaderData } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Products = () => {
    const products = useLoaderData();

    return (
        <div className='container mx-auto'>
            <div>{products.length > 0 ? <p className='text-4xl font-semibold text-center py-10'>{products[0].category}</p> : <p className='text-lg text-center py-10'>No Products in this Category</p>} </div>
            <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <ProductCard key={product._id} product={product} ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;