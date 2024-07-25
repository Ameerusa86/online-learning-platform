// components/CourseCard.js
import Link from "next/link";
import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border p-4 m-2 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="mb-2">{course.description}</p>
      <Link className="text-blue-600" href={`/course/${course.id}`}>
        View Course
      </Link>
    </motion.div>
  );
}
