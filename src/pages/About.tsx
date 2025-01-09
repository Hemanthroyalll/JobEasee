import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, FileText, Rocket, Sparkles } from 'lucide-react';
import Background from '../components/Background';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/95 via-green-900/95 to-gray-900/95">
      <Background opacity={0.1} />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto text-white"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur-md rounded-lg p-6 mb-8">
          <p className="text-lg leading-relaxed mb-6">
            Welcome to JobEase—your ultimate AI-powered assistant for streamlining job applications. Designed to save time and effort, our platform combines intelligent automation with a user-centric approach to revolutionize how you apply for jobs.
          </p>
          <p className="text-lg leading-relaxed">
            Our system automates every step of the process: extracting job details, tailoring resumes, and crafting personalized cover letters. With JobEase, you focus on what matters most—preparing for the opportunity of a lifetime.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <Brain className="w-8 h-8 text-green-400" />,
              title: "AI-Powered Assistance",
              description: "Automated tools that simplify the job application process with precision."
            },
            {
              icon: <FileText className="w-8 h-8 text-green-400" />,
              title: "Tailored Resumes",
              description: "Customizable resumes aligned with specific job requirements."
            },
            {
              icon: <Rocket className="w-8 h-8 text-green-400" />,
              title: "Effortless Cover Letters",
              description: "Generate impactful cover letters in seconds, personalized for every job."
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-md rounded-lg p-6 text-center hover:bg-black/40 transition-colors"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At JobEase, we aim to make job hunting stress-free and efficient. Whether you're a recent graduate or a seasoned professional, our goal is to empower you with tools that eliminate repetitive tasks, highlight your strengths, and maximize your chances of success. Let JobEase handle the details while you focus on landing your dream role.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
