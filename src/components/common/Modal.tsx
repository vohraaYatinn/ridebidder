import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-background p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        {title && <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>}
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
