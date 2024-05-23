import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useCart from "../../hooks/useCart";



const FoodCard = ({ item }) => {
    const { _id, image, name, price, recipe } = item;
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const axiosCommon = useAxiosCommon();
    const [,,refetch] = useCart();

    const handleAddToCart = () => {

        if (user && user.email) {
            // send cart item to the database

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosCommon.post('/carts', cartItem)
                .then(data => {
                    console.log(data.data)
                    if (data.data) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your card`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the art items count
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

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
                    <button onClick={handleAddToCart} className="btn text-[#BB8506] border-b-2 border-[#BB8506] rounded-lg px-5 md:text-lg border-0">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;