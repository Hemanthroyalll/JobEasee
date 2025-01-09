import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1
        }
      }
    }
  };

  const textVariants = {
    hover: {
      scale: 1.1,
      color: "#60A5FA",
      textShadow: "0 0 8px rgb(59, 130, 246)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover="hover"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <motion.div variants={logoVariants}>
              <Bot className="h-8 w-8 text-blue-500" />
            </motion.div>
            <motion.span
              variants={textVariants}
              className="text-xl font-bold text-white"
            >
              JobEase
            </motion.span>
          </motion.div>
          
          <div className="flex space-x-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/chat', label: 'Chat' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-white hover:text-blue-400 transition-colors ${
                  location.pathname === path ? 'text-blue-400' : ''
                }`}
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-[-4px]"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;