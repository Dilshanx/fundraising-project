import { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  Rocket as RocketIcon,
  CreditCard as CreditCardIcon,
  MessageCircle as MessageCircleIcon,
  Menu as MenuIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  Users as UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "../config/apiConfig";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Theme Check
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Login Status Check
    const checkLoginStatus = async () => {
      try {
        const response = await apiConfig.get("/auth/status", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserData(response.data.user);
          console.log("User data:", response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await apiConfig.post("/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", Icon: HomeIcon },
    { href: "/explore-campaigns", label: "Campaigns", Icon: RocketIcon },
    { href: "/donate", label: "Donate", Icon: CreditCardIcon },
    { href: "/help-support", label: "Support", Icon: MessageCircleIcon },
  ];

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md dark:shadow-xl fixed top-0 left-0 right-0 z-50 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Platform Logo */}
        <Link
          to='/'
          className='text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center'
        >
          FundRaise
          <span className='text-purple-600 dark:text-purple-400 ml-1'>Hub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden md:flex space-x-6 items-center'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center transition-colors'
            >
              <link.Icon size={18} className='mr-2' /> {link.label}
            </Link>
          ))}
          {/* Admin Dashboard Link (conditionally rendered) */}
          {isLoggedIn && userData && userData.role === "admin" && (
            <Link
              to='/admin'
              className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center transition-colors'
            >
              <UsersIcon size={18} className='mr-2' /> Admin Dashboard
            </Link>
          )}
        </div>

        {/* Theme Toggle and User/Logout Buttons */}
        <div className='hidden md:flex items-center space-x-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>

          {isLoggedIn && userData ? (
            <div className='flex items-center space-x-2'>
              {/* User Profile */}
              <Link
                to='/user-profile'
                className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center transition-colors'
              >
                <UserIcon size={20} className='mr-1' />
                <span className='hidden md:inline'>{userData.name}</span>
              </Link>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 text-white'
              >
                <LogOutIcon size={18} className='mr-2' /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant='outline'
                onClick={() => navigate("/login")}
                className='border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500'
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden flex items-center space-x-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='text-gray-600 dark:text-gray-300'
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-gray-600 dark:text-gray-300'
          >
            <MenuIcon />
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className='absolute top-full left-0 right-0 bg-white dark:bg-gray-800 md:hidden shadow-lg dark:shadow-xl'>
            <div className='flex flex-col space-y-2 p-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className='py-2 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300 flex items-center'
                >
                  <link.Icon size={18} className='mr-2' /> {link.label}
                </Link>
              ))}
              {/* Admin Dashboard Link (conditionally rendered) */}
              {isLoggedIn && userData && userData.role === "admin" && (
                <Link
                  to='/admin
                  '
                  className='py-2 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300 flex items-center'
                >
                  <UsersIcon size={18} className='mr-2' /> Admin Dashboard
                </Link>
              )}
              {isLoggedIn && userData ? (
                <div className='flex items-center space-x-2'>
                  {/* User Profile */}
                  <Link
                    to='/user-profile'
                    className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center transition-colors'
                  >
                    <UserIcon size={20} className='mr-1' />
                    <span className='hidden md:inline'>{userData.name}</span>
                  </Link>

                  {/* Logout Button */}
                  <Button
                    onClick={handleLogout}
                    className='bg-red-500 hover:bg-red-600 text-white'
                  >
                    <LogOutIcon size={18} className='mr-2' /> Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/login")}
                    className='border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500'
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
