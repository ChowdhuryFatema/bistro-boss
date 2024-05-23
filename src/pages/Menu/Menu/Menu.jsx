import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCat from "./MenuCat/MenuCat";
import useMenu from "../../../hooks/useMenu";


const Menu = () => {

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const offered = menu.filter(item => item.category === "offered")

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <div>
                <Cover img={menuImg} title="OUR MENU"></Cover>
                <div className="max-w-7xl mx-auto px-5 my-5 md:my-20">

                    {/* main cover  */}
                    <SectionTitle subHeading={"---Don't miss---"} heading={"TODAY'S OFFER"}></SectionTitle>

                    {/* offered menu items  */}
                    <MenuCat items={offered}></MenuCat>

                    {/* dessert menu items  */}
                    <MenuCat items={desserts} img={dessertImg} title="dessert" ></MenuCat>

                     {/* pizza menu items  */}
                     <MenuCat items={pizza} img={pizzaImg} title="pizza" ></MenuCat>
                     {/* salad menu items  */}
                     <MenuCat items={salad} img={saladImg} title="salad" ></MenuCat>
                     {/* soup menu items  */}
                     <MenuCat items={soup} img={soupImg} title="soup" ></MenuCat>
                </div>
            </div>
        </>
    );
};

export default Menu;