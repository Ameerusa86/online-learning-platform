// components/AboutUs.jsx
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-700">
            We are a leading online learning platform providing high-quality
            courses across various fields. Our mission is to make education
            accessible and affordable for everyone. Our courses are taught by
            industry experts and designed to help you achieve your career goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
