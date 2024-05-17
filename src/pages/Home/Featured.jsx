import SectionTitle from "../../components/SectionTitle/SectionTitle";
import featuredImg from '../../assets/home/featured.jpg';


const Featured = () => {
    return (
        <div className="featured-item my-5 md:my-10">
            <div className="bg-black bg-opacity-60 py-4">
                <div className="max-w-7xl mx-auto px-5 my-5 md:my-20">
                    <div className="relative z-30 text-white">
                        <SectionTitle
                            subHeading={'---Check it out---'}
                            heading={'FROM OUR MENU'}
                        ></SectionTitle>
                    </div>
                    <div className="md:flex justify-center items-center gap-10  space-y-5 md:py-10 md:px-16">
                        <div>
                            <img className="object-cover" src={featuredImg} alt="" />
                        </div>
                        <div className="text-white space-y-2">
                            <p>March 20, 2023</p>
                            <p>WHERE CAN I GET SOME?</p>
                            <p>Succulent grilled chicken, kissed by the flames, dances with aromatic herbs, promising a savory symphony in every bite. Crispy golden fries, whispering tales of potatoes transformed, embrace the palate with their salty, comforting crunch.</p>
                            <div className="pt-5">
                                <button className="btn btn-outline text-white border-0 border-b-2 hover:bg-transparent hover:border-white px-8 rounded-xl border-white text-lg">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;