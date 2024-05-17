import SectionTitle from "../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios('/reviews.json')
            .then(data => {
                setReviews(data.data)
            })
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-5 my-5 md:my-10">
            <SectionTitle
                subHeading={'---What Our Clients Say---'}
                heading={'TESTIMONIALS'}
            ></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}>
                            <div className="w-3/4 space-y-4 mx-auto">
                                <div className="flex justify-center items-center">
                                    <Rating className=""
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                                <p className="text-center">{review.details}</p>
                                <h3 className="text-2xl text-[#CD9003] text-center font-semibold">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }


                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;