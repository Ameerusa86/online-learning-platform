// components/Contact.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-20 bg-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Contact Us
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="inline-block bg-blue-500 text-white py-3 px-6 rounded-md shadow hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
