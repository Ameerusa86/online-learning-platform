"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { motion } from "framer-motion";
import CourseCard from "@/app/components/CourseCard";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(firestore, "courses"));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    };

    const fetchFilters = async () => {
      const categoriesSnapshot = await getDocs(
        collection(firestore, "categories")
      );
      const technologiesSnapshot = await getDocs(
        collection(firestore, "technologies")
      );

      setCategories(categoriesSnapshot.docs.map((doc) => doc.data().name));
      setTechnologies(technologiesSnapshot.docs.map((doc) => doc.data().name));
    };

    fetchCourses();
    fetchFilters();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [categoryFilter, priceFilter, technologyFilter]);

  const filterCourses = () => {
    let filtered = courses;

    if (categoryFilter) {
      filtered = filtered.filter(
        (course) =>
          course.category &&
          course.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (priceFilter) {
      filtered = filtered.filter((course) => {
        const price = parseFloat(course.price);
        if (priceFilter === "free") return price === 0;
        if (priceFilter === "paid") return price > 0;
        return false;
      });
    }

    if (technologyFilter) {
      filtered = filtered.filter(
        (course) =>
          course.technology &&
          course.technology
            .map((tech) => tech.toLowerCase())
            .includes(technologyFilter.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-4"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
          Available Courses
        </h1>
        <div className="mb-6 flex justify-center space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Filter by Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Filter by Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
          <select
            value={technologyFilter}
            onChange={(e) => setTechnologyFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Filter by Technology</option>
            {technologies.map((technology, index) => (
              <option key={index} value={technology}>
                {technology}
              </option>
            ))}
          </select>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.2,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default CoursesPage;
