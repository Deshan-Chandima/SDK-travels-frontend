import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50">
      <header className="flex items-center justify-between px-6 md:px-16 h-20 backdrop-blur-md bg-black/60 transition-all duration-300">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/logo.jpg" // <-- public folder logo
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap items-center gap-4 md:gap-6 text-white font-medium text-sm md:text-base justify-center">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/countries" className="hover:text-blue-500 transition">
              Country
            </Link>
          </li>
          <li>
            <Link to="/tc" className="hover:text-blue-500 transition">
              Trip Catalogue
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition">
              About
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="w-36 md:w-44 lg:w-56 px-10 py-2 rounded-full border-2 border-white bg-transparent text-white placeholder-white/70 focus:w-64 focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
            fill="#fff"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </header>
    </nav>
  );
}
