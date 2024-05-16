// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';

// import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='max-w-7xl mx-auto px-5 my-8 md:my-20'>
           <SectionTitle
           subHeading={'---From 11:00am to 10:00pm---'}
           heading={'ORDER ONLINE'}
           ></SectionTitle>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                breakpoints={{
                    640: {
                      slidesPerView: 1
                    },
                    768: {
                      slidesPerView: 2
                    },
                    1024: {
                      slidesPerView: 4
                    },
                  }}
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h3 className="w-full text-3xl md:text-4xl uppercase text-center pb-20 -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h3 className="w-full text-3xl md:text-4xl uppercase text-center pb-20 -mt-16 text-white">pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h3 className="w-full text-3xl md:text-4xl uppercase text-center pb-20 -mt-16 text-white">Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h3 className="w-full text-3xl md:text-4xl uppercase text-center pb-20 -mt-16 text-white">desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h3 className="w-full text-3xl md:text-4xl uppercase text-center pb-20 -mt-24 text-white">Salads</h3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;