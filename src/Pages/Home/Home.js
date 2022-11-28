import React from 'react';
import hero from '../../assets/images/hero-drone.png'
import { useLoaderData } from 'react-router-dom';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';

const Home = () => {
    const categories = useLoaderData();
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

            <section>
                <div className='text-center'>
                    <h4 className='font-bold py-5 text-xl text-black-500'>Featured Items</h4>
                </div>

            </section>


        </div>
    );
};

export default Home;