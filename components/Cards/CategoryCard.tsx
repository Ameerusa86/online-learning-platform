import Image, { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string | StaticImageData;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, index }) => {
  return (
    <motion.article
      className="relative flex flex-col items-center justify-end overflow-hidden rounded-xl p-6 bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="w-[150px] h-[150px] overflow-hidden rounded-full bg-gray-700 mb-4 border-4 border-transparent hover:border-indigo-500 transition-border duration-500 ease-in-out">
        <Image
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
          width={150}
          height={150}
          priority
        />
      </div>
      <h3 className="text-lg font-bold text-white mt-2">{name}</h3>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </motion.article>
  );
};

export default CategoryCard;
