import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../shared/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular')

    return (
        <div className="max-w-7xl mx-auto px-5 my-5 md:my-20">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    popularItems.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;