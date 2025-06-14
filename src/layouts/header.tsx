import { NavLink, Link } from "react-router-dom";

// Danh sách menu chính
const navItems = [
    { label: "Product", to: "/product" },
    { label: "Pricing", to: "/pricing" },
    { label: "Contact us", to: "/contact" },
    { label: "Blog", to: "/blog" },
    { label: "About Us", to: "/about" },
];

const Header = () => {
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

                    <span className="text-lg font-medium text-gray-900">"OoO"</span>
                </Link>

                {/* Main nav  */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navItems.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 ${
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
                    <NavLink to="/cart" className="relative text-gray-800 transition-colors">
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
                    </NavLink>

                    {/* Login (chỉ hiện trên desktop) */}
                    <NavLink
                        to="/login"
                        className="hidden lg:inline text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                    >
                        Login
                    </NavLink>

                    {/* Register button */}
                    <NavLink
                        to="/register"
                        className="inline-flex items-center rounded-full bg-[#2D2D2D] px-8 py-4 text-sm font-semibold text-[#F2EDE6] shadow hover:opacity-90 transition-opacity"
                    >
                        Register
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
