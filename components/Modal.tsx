import { useState } from "react";

export default function PopupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Modal Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        ></div>
      )}

      {/* Modal Content */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Popup Modal Title
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Popup Modal Content
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Popup Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-0 right-0 p-4 mb-12 mr-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
      >
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 13H5v-2h14v2z"></path>
        </svg>
      </button>
    </>
  );
}
