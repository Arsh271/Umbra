import React, { useEffect, useState } from 'react';
import { 
  IoCheckmarkCircleOutline, 
  IoCloseCircleOutline, 
  IoInformationCircleOutline, 
  IoClose 
} from "react-icons/io5";

const icons = {
  success: <IoCheckmarkCircleOutline className="w-6 h-6 text-green-400" />,
  error: <IoCloseCircleOutline className="w-6 h-6 text-red-400" />,
  info: <IoInformationCircleOutline className="w-6 h-6 text-blue-400" />,
};

const styles = {
  success: "border-green-500/30 bg-green-500/10 text-green-200",
  error: "border-red-500/30 bg-red-500/10 text-red-200",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-200",
};

const Notification = ({ id, message, type = 'info', onClose, duration = 4000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Wait for exit animation
  };

  return (
    <div
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 
        backdrop-blur-md transition-all duration-300 transform 
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
        ${styles[type]} border
      `}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">
              {message}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex h-4 w-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <IoClose className="h-4 w-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
