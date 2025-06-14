import { Link } from "react-router-dom";

const Header = () => (
    <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">T‑Shirt Store</h1>
        <nav className="space-x-4">
            <Link to="/" className="hover:text-blue-600">
                Home
            </Link>
            <Link to="/login" className="hover:text-blue-600">
                Login
            </Link>
            <Link to="/register" className="hover:text-blue-600">
                Register
            </Link>
        </nav>
    </header>
);

export default Header;
