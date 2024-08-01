import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TutorialCard({ tutorial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative">
        {tutorial.imageUrl ? (
          <Image
            src={tutorial.imageUrl}
            alt="tutorial image"
            className="w-full h-48 object-cover rounded-t-lg"
            width={400}
            height={200}
            property="image"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent text-white w-full">
          <h2 className="text-xl font-bold">{tutorial.title}</h2>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-2 text-gray-800">
          <span className="font-bold">Desc: </span>
          {tutorial.description}
        </p>
        {/* <p className="mb-2 text-gray-800">
          <span className="font-bold">Price: </span>
          {course.price === 0 ? "Free" : course.price}
        </p> */}

        {/* <p className="mb-2 text-gray-800">
          <span className="font-bold">Tech: </span>
          {course.technology}
        </p> */}
        <Link
          className="inline-block mt-4 px-4 py-2 text-center bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          href={`/tutorial/${tutorial.id}`}
        >
          Enroll Now
        </Link>
      </div>
    </motion.div>
  );
}
