import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 transition duration-500 ease-in-out">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full py-5 px-6 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="py-5 px-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
