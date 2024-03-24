import { useState } from "react";
import { MdArrowRight } from "react-icons/md";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-body writing-spacing">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transform transition-transform text-2xl ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <MdArrowRight />
        </span>
        <h2 className="font-medium">{title}</h2>
      </div>
      <div
        className={`overflow-hidden duration-300 ease-in-out ${
          isOpen ? "h-auto" : "h-0"
        }`}
      >
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
