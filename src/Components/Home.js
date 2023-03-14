import React from 'react'
import Delivery from '../img/delivery.png'
import herobg from '../img/heroBg.png'
import {homedata }from '../utils/data'


const Home = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
            <div className='py-2 flex-1 flex flex-col items-start justify-start md:items-start gap-6' >
                <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-4 py-1'>
                    <p className='text-base text-orange-600 font-semibold'>
                        Bike Delivery
                    </p>
                    <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={Delivery} className='w-full h-full object-contain' alt='delivery' />
                    </div>
                </div>
                <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>The Fastest Delivery in <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span></p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>this is the fastest delivery in your city this is the fastest delivery in your city this is the fastest delivery in your city this is the fastest delivery in your city this is the fastest delivery in your citythis is the fastest delivery in your city this is the fastest delivery in your </p>
                <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
            </div>

            <div className='py-2 flex-1 flex items-center relative' >
                <img src={herobg} className="ml-auto h-400 w-full lg:w-auto lg:h-650" alt="hero-bg" />
                <div className='w-full h-full absolute top-0 left-0 lg:px-32 py-4 flex items-center justify-center gap-4 flex-wrap'>
                    {homedata && homedata.map(n => (
                    <div key={n.id} className='lg:w-190  drop-shadow-lg bg-cardOverlay backdrop-blur-md rounded-3xl p-4 flex items-center justify-center flex-col'>
                        <img src={n.img} className="w-20 lg:w-40 -mt-10 lg:-mt-20" />
                        <p className='lg:text-xl text-base mt-2 lg:mt-4 font-semibold'>{n.name}</p>
                        <p className='text-md text-lighttextGray my-1 font-semibold lg:my-3'>{n.decp}</p>
                        <p className='text-sm font-semibold text-headingColor'> <span className='text-xs text-red-600'>$</span>{n.price}</p>
                    </div>))}

                </div>
            </div>
        </section>
    )
}

export default Home