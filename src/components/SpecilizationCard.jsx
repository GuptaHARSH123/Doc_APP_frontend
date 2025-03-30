import React from "react";

function SpecilizationCard({ item, onClick }) {
  console.log("item", item.name);
  
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-700">{item.Paragraph}</p>
    </div>
  );
}

export default SpecilizationCard;
