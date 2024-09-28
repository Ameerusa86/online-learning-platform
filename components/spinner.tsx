import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute animate-spin rounded-full h-96 w-96 border-t-4 border-b-4 border-purple-500"></div>
      <Image
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        className="rounded-full h-64 w-64"
        width={500}
        height={500}
        alt="spinner"
      />
    </div>
  );
};

export default Spinner;
