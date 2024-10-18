import React, { useEffect } from 'react';

const Modal = ({ isOpen, message, onClose }) => {
  // Usamos useEffect para cerrar el modal después de 4 segundos cuando se abre
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Llama a la función de cerrar modal
      }, 4000); // 4000ms = 4 segundos

      // Limpia el temporizador si el modal se cierra antes de los 4 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold text-red-800 mb-4">¡AVISO!</h2>
        <p className="text-red-700 mb-6">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
