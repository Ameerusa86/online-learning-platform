import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const DashboardCard = ({ item, onEdit, onDelete }) => {
  const { title, description, price } = item;

  return (
    <div className="flex flex-col bg-white w-72 h-48 rounded-md py-4 px-6 border shadow-xl">
      <h3 className="text-center font-bold text-xl text-gray-800 pb-2">
        $ {price}
      </h3>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 pb-3">{description}</p>

      <div className="flex justify-around items-center py-3">
        <div
          onClick={() => onEdit(item)}
          className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
        >
          <FaEdit />
          <button className="font-semibold text-sm text-green-700">Edit</button>
        </div>
        <div
          onClick={() => onDelete(item.id)}
          className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
        >
          <FaTrash />
          <button className="font-semibold text-sm text-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
