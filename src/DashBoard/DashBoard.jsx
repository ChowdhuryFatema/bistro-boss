import { NavLink, Outlet } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaListAlt, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";


const DashBoard = () => {

    const isAdmin = true;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu space-y-3 *:text-white">

                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome size={24} className="text-white" />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils size={24} className="text-white" />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaListAlt size={24} className="text-white" />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook size={24} className="text-white" />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <FaUsers size={24} className="text-white" />
                                        All Users
                                    </NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome size={24} className="text-white" />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar size={24} className="text-white" />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <IoCartOutline size={24} className="text-white" />
                                        My Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd size={24} className="text-white" />
                                        Add a Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList size={24} className="text-white" />
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                    }


                    <hr className="my-5" />

                    {/* shared nav link  */}

                    <li>
                        <NavLink to="/">
                            <FaHome size={24} className="text-white" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch size={24} className="text-white" />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope size={24} className="text-white" />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 px-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;