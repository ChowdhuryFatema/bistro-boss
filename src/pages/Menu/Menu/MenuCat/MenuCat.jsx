import { Link } from "react-router-dom";
import Cover from "../../../shared/Cover";
import MenuItem from "../../../shared/MenuItem";


const MenuCat = ({ items, title, img }) => {
    return (
        <div>
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-5 md:my-20">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="pb-10 flex flex-col justify-center items-center">
                <Link to={`/order/${title}`} className="btn btn-outline  border-0 border-b-2 hover:bg-transparent  px-8 rounded-xl text-lg">Order Naw</Link>
            </div>
        </div>
    );
};

export default MenuCat;


