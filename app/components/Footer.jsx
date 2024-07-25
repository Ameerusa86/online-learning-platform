// components/Footer.js
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-blue-600 p-4 text-center text-white"
    >
      &copy; {new Date().getFullYear()} Online Learning Platform. All rights
      reserved.
    </motion.footer>
  );
}
