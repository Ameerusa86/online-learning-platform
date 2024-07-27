// components/Categories.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(firestore, "categories"));
      setCategories(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="border p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
