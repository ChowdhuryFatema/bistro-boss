

const FoodCard = ({ item }) => {

    const { image, name, price, recipe } = item;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="relative">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="bg-black px-2 text-white absolute top-5 right-10">${price}</p>
            </div>
            <div className="card-body flex flex-col justify-center items-center">
                <h2 className="card-title font-bold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn text-[#BB8506] border-b-2 border-[#BB8506] rounded-lg px-5 md:text-lg border-0">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;