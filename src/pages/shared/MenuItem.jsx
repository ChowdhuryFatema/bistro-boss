

const MenuItem = ({ item }) => {
    const { image, name, price, recipe } = item;

    return (
        <div className="md:flex gap-5">
            <img className="md:w-[120px] md:h-[120px] object-cover img" src={image} alt="" />
            <div className="mt-5 md:mt-0 space-y-2">
                <h3 className="uppercase text-xl">{name}----------------</h3>
                <p className="text-[#737373]">{recipe}</p>
            </div>
            <p className="text-[#BB8506]">{price}</p>
        </div>
    );
};

export default MenuItem;