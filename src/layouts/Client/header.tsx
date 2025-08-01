import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, openCart, setCart } from "../../redux/store/cartSlice";
import { openLogin } from "../../redux/store/loginSlice";
import { openRegister } from "../../redux/store/registerSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { Avatar, Dropdown, Menu } from "antd";
import { logoutUser } from "../../services/auth.services";
import { useEffect } from "react";
import { fetchAndEnrichCart } from "../../utils/cartUtils";

const navItems = [{ label: "Admin Dashboard", to: "/admin" }];

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.account.isAuthenticated);
    const user = useSelector((state: RootState) => state.account.user);
    const { username, email, phone, address, role, id: userId } = user;

    const cartItems = useSelector((state: RootState) => state.cart.items || []);
    const displayCount = cartItems.length > 9 ? "9+" : cartItems.length;

    const getInitial = (name: string) => name?.charAt(0).toUpperCase() || "?";

    useEffect(() => {
        const fetchCart = async () => {
            if (isAuthenticated && userId) {
                try {
                    const enriched = await fetchAndEnrichCart(userId);
                    dispatch(setCart(enriched));
                } catch (err) {
                    console.error("Lỗi khi lấy giỏ hàng:", err);
                }
            }
        };
        fetchCart();
    }, [isAuthenticated, userId, dispatch]);

    return (
        <header>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo + brand  */}
                <Link to="/" className="flex items-center space-x-2">
                    <svg
                        className="w-10 h-10 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-lg font-medium text-gray-900">HOME</span>
                </Link>

                {/* Main nav  */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navItems
                        .filter((item) => item.label !== "Admin Dashboard" || role === "ADMIN")
                        .map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `text-lg font-medium transition-colors duration-200 ${
                                        isActive ? "text-[#018294]" : "text-gray-700 hover:text-[#018294]"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                </nav>

                {/* Action buttons  */}
                <div className="flex items-center space-x-6">
                    {/* Cart icon */}
                    <div
                        className="relative text-gray-800 transition-colors cursor-pointer"
                        onClick={() => dispatch(openCart())}
                    >
                        <svg
                            className="w-8 h-8 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                            />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                {displayCount}
                            </span>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.SubMenu key="profile" title="Profile">
                                        <Menu.Item key="userinfo" disabled>
                                            <div className="px-2 py-1 text-sm text-gray-800 space-y-2">
                                                <p>👤 Username: {username}</p>
                                                <p>📧 Email: {email}</p>
                                                <p>📞 Phone: {phone}</p>
                                                <p>🏠 Address: {address}</p>
                                            </div>
                                        </Menu.Item>
                                    </Menu.SubMenu>

                                    <Menu.Divider />
                                    <Menu.Item
                                        key="logout"
                                        onClick={() => {
                                            dispatch(clearCart());
                                            logoutUser(dispatch);
                                        }}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }}>
                                {getInitial(username)}
                            </Avatar>
                        </Dropdown>
                    ) : (
                        <>
                            <div
                                className="hidden lg:inline text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
                                onClick={() => dispatch(openLogin())}
                            >
                                Login
                            </div>
                            <div
                                className="inline-flex items-center rounded-full bg-[#2D2D2D] px-8 py-4 text-sm font-semibold text-[#F2EDE6] shadow hover:opacity-90 transition-opacity cursor-pointer"
                                onClick={() => dispatch(openRegister())}
                            >
                                Sign Up
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
