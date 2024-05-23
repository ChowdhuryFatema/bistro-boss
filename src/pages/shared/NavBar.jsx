import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { IoCartOutline } from "react-icons/io5";
import useCart from "../../hooks/useCart";

const NavBar = () => {
    const [carts] = useCart();

    const { user, logOutUser } = useContext(AuthContext);
    const navItems = <>
        <NavLink className="py-2 px-3 md:text-lg" to="/">Home</NavLink>
        <NavLink className="py-2 px-3 md:text-lg" to="/menu">Menu</NavLink>
        <NavLink className="py-2 px-3 md:text-lg" to="/order/salad">Order Food</NavLink>

        {
            user ?
                <>
                    <NavLink onClick={() => logOutUser()} className="py-2 px-3 md:text-lg">Log out</NavLink>
                </> :
                <>
                    <NavLink className="py-2 px-3 md:text-lg" to="/login">Login</NavLink>
                </>
        }
        <NavLink to="/dashboard/cart">
            <button className="btn btn-sm bg-transparent border-0 mt-[6px]">
                <IoCartOutline size={24} className="text-white" />
                <div className="badge badge-secondary">+{carts.length}</div>
            </button>
        </NavLink>

    </>

    return (
        <div className="fixed top-0 left-0 z-10 text-white w-full bg-black bg-opacity-40">
            <div className="navbar max-w-7xl mx-auto px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="drawer-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                            </div>
                        </div>
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                    {navItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;