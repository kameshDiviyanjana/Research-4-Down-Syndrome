import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Rocket,
  LogIn,
  LogOut,
} from "lucide-react";

const Navbar = () => {
 const token = localStorage.getItem("token");

  const [isDarkMode, setIsDarkMood] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = ()=>{
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  const location = useLocation();
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-5 h-5 mr-2" />,
    },
    {
      name: "Skill Development",
      path: "/skills",
      icon: <Rocket className="w-5 h-5 mr-2" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <User className="w-5 h-5 mr-2" />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <Mail className="w-5 h-5 mr-2" />,
    },
    token
      ? {
          name: "Sign out",
          path: "#", // Prevent navigation on logout
          icon: <LogOut className="w-5 h-5 mr-2" />,
          action: logout,
        }
      : {
          name: "Sign in",
          path: "/login",
          icon: <LogIn className="w-5 h-5 mr-2" />,
        },
  ];

  const toggleTheme = () => {
    setIsDarkMood(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  //close mobile menu when location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isDarkMode ? " bg-gray-800 text-white " : " bg-white text-gray-900 "
      }shadow-md transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/*Logo*/}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center font-bold text-lg hover:text-yellow-300 transition-colors"
            >
              පොඩ්ඩො හැමෝටම
            </Link>
          </div>

          {/*Nav tabs*/}
          <div className="hidden md:flex md:space-x-4 items-center">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.name}
                to={navLink.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
                    ${
                      location.pathname === navLink.path
                        ? isDarkMode
                          ? " bg-gray-700 text-white "
                          : " bg-blue-100 text-blue-800 "
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    `}
              >
                {navLink.icon}
                {navLink.name}
              </Link>
            ))}

            {/*theme mode, dark mode or day */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          {/*mobile menu toggle */}
          <div className="md:hidden flex items-center">
            {/*mobile toggle theme */}
            <button
              className={`mr-2 p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/*mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                  ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden  ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } absolute top-16 left-0 w-full shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMobileMenu}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-blue-100 text-blue-800"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
