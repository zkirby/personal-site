import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

const RotatingText = ({ textList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % textList.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentIndex, textList.length]);

  return (
    <div className="relative inline-block">
      {textList.map((text, index) => (
        <Transition
          key={text}
          show={index === currentIndex}
          enter="transition-opacity duration-1000 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="absolute bottom-0 w-full text-center text-4xl font-bold text-white">
            {text}
          </p>
        </Transition>
      ))}
    </div>
  );
};

export default RotatingText;
