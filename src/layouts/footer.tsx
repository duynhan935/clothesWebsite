import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";

const social = [
    { icon: faLinkedin, to: "https://www.linkedin.com" },
    { icon: faFacebookSquare, to: "https://www.facebook.com" },
    { icon: faInstagram, to: "https://www.instagram.com" },
];

const Footer = () => (
    <footer className="bg-[#F2EDE6]">
        <div className="mx-auto flex max-w-[1250px] flex-wrap items-center justify-between gap-y-4 px-6 py-8">
            {/* Logo */}
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

            {/* Social icons */}
            <div className="flex items-center space-x-6">
                {social.map(({ icon, to }) => (
                    <a
                        key={to}
                        href={to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 transition-colors hover:text-teal-600"
                    >
                        <FontAwesomeIcon icon={icon} size="lg" />
                    </a>
                ))}
            </div>
        </div>
    </footer>
);

export default Footer;
