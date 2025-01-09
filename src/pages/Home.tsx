import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import DynamicBackground from '../components/Background';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicBackground opacity={0} />

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgb(72, 187, 120)",
              }}
            >
              JobEase
            </motion.span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Simplifying your job application process with intelligent automation.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Save time and effort with our AI-powered tools: Extract job details, tailor your resume, and generate personalized cover letters effortlessly. Let us handle the tedious parts so you can focus on landing your dream job.
          </p>

          <motion.button
            onClick={() => navigate('/chat')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-full overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <span>Start Now</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
