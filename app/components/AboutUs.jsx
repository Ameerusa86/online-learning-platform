// components/AboutUs.jsx
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-20 bg-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-6">About Me</h2>
          <p className="text-lg text-white">
            I'm a software developer with a passion for teaching. I have over 3
            years of experience in web development and have worked with a
            variety of technologies including React, Node.js, Angular and
            Firebase along side with other technologies on the web development
            side, Databases like Mongo DB & SQL, Python with RPA Automation and
            Data Processing. I'm excited to share my knowledge with you and help
            you learn new skills.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
