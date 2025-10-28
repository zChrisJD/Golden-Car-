import React, { ReactNode } from 'react';
import { XMarkIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center" onClick={onClose}>
      <div 
        className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center z-10">
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
            <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-700"
                aria-label="Fechar modal"
            >
                <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;