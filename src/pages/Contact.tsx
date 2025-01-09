import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, User, ExternalLink } from 'lucide-react';
import Background from '../components/Background';

const Contact = () => {
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Additional form submission logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-gray-900/95">
      <Background opacity={0.1} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-md rounded-lg p-8">
              {['name', 'email', 'message'].map((field, index) => (
                <div className="mb-6" key={index}>
                  <label htmlFor={field} className="block text-white mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ) : (
                    <textarea
                      id={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  )}
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Developer</h2>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setShowAuthorInfo(!showAuthorInfo)}
              >
                <div className="flex items-center space-x-4 text-white">
                  <User className="w-6 h-6" />
                  <span className="font-semibold">Hemanth</span>
                </div>
              </motion.div>

              {showAuthorInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-300"
                >
                  <p className="mb-4">
                  Hemanth is the visionary behind JobEase, blending academic expertise with real-world industry experience to streamline the job application process. With a Master's degree in Software Engineering and a Bachelor's in Computer Science, Hemanth is passionate about harnessing the power of AI to simplify and enhance career opportunities for job seekers.
                  </p>
                  <div className="flex space-x-4">
                    {[Github, Linkedin, Mail].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
              <div className="space-y-4">
                {[
                  { label: 'GitHub', Icon: Github, href: '#' },
                  { label: 'LinkedIn', Icon: Linkedin, href: '#' },
                  { label: 'Email', Icon: Mail, href: 'mailto:contact@supplyai.com' }
                ].map(({ label, Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="flex items-center space-x-4 text-white hover:text-blue-400 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                    <span>{label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
