

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='my-10 space-y-4'>
            <p className='text-[#D99904] text-center'>{subHeading}</p>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='border-y-4 border-[#E8E8E8] text-center text-2xl md:text-3xl lg:text-4xl py-5 px-10 inline'>{heading}</h2>
            </div>
        </div>
    );
};

export default SectionTitle;