import React from 'react';
import hero from '../../assets/images/hero-drone.png'
import { useLoaderData } from 'react-router-dom';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Home = () => {
    const categories = useLoaderData();

    const { data: featuredProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['products',],
        queryFn: async () => {
            const res = await fetch('https://final-server-one.vercel.app/featured',)
            const data = await res.json();
            return data
        }
    });

    return (
        <div className='bg-slate-100'>
            {/* Hero Section */}
            <section className='hero'>
                <div className='hero-content flex-col-reverse lg:flex-row min-h-screen'>
                    <div className='max-w-2xl justify-between'>
                        <h3 className='text-6xl font-bold text-[#3A4256]'>Buy/Sale Used Drones</h3>
                        <p className='py-6'>Your trusted "Drone" reseller center. You'll find all kinds of used drones here. Also you can post to sell your!</p>
                        <button className='btn border-none rounded none text-white bg-black text-center'>Post Ad</button>
                    </div>
                    <div className=''>
                        <img src={hero} alt="" />
                    </div>
                </div>
            </section>

            {/* Section-2 (Categories) */}

            <section className='pb-20'>
                <div className='text-center'>
                    <h4 className='font-bold py-5 text-xl text-black-500'>Categories</h4>
                    <h5 className='text-4xl text-gray-400'>Types of Drones</h5>
                </div>
                {/* Categories */}
                <div className='container mx-auto grid grid-cols-3 gap-5 py-16'>
                    {
                        categories.map(category => <CategoryCard
                            key={category.name} category={category}></CategoryCard>)
                    }
                </div>
            </section>

            {/* Featured Products */}

            <section className='pb-20'>
                <div className='text-center'>
                    <h4 className='font-bold py-5 text-xl text-black-500'>Featured Items</h4>
                </div>
                <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        featuredProducts.length > 0 && featuredProducts.map(product => <ProductCard
                            key={product._id}
                            product={product}
                        ></ProductCard>)
                    }
                </div>

            </section>



        </div>
    );
};

export default Home;