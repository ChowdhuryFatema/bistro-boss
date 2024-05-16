import bistroImg from '../../assets/home/chef-service.jpg';

const BistroBoss = () => {
    return (
        <div className="max-w-7xl mx-auto px-5 my-5 md:my-10">
            <div className='relative'>
                <img className='h-96 object-cover w-full' src={bistroImg} alt="" />
                <div className='bg-white p-5 md:p-20 absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] space-y-4 w-3/4 lg:w-1/2'>
                    <h3 className='text-center text-3xl md:text-4xl'>Bistro Boss</h3>
                    <p className='text-center'>Velvety chocolate lava cake, erupting with molten ecstasy, indulges the senses in a decadent embrace of sweetness.</p>
                </div>
            </div>
        </div>
    );
};

export default BistroBoss;