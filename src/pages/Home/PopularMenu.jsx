import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import axios from "axios";
import MenuItem from "../shared/MenuItem";


const PopularMenu = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios('menu.json')
        .then(data => {
            const popularItems = data.data.filter(item => item.category === 'popular')
            setMenu(popularItems);
        })
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-5 my-5 md:my-20">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    menu.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;