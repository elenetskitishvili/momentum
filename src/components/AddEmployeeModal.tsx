"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AddEmployeeForm from "./AddEmployeeForm";

interface AddEmployeeModalProps {
  closeModal: () => void;
  isClosing: boolean;
}

export default function AddEmployeeModal({
  closeModal,
  isClosing,
}: AddEmployeeModalProps) {
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setModalContainer(document.body);
  }, []);

  if (!modalContainer) return null;

  return createPortal(
    <div
      onClick={closeModal}
      className={`fixed inset-0 bg-dark-text/15 backdrop-blur-[10px] flex items-start justify-center z-50 modal-overlay ${
        isClosing ? "closing" : ""
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white px-[50px] pt-[117px] pb-[60px] modal-window mt-[118px] rounded-[10px] ${
          isClosing ? "closing" : ""
        }`}
      >
        <h3 className="text-[32px] leading-[100%] text-primary-text font-medium text-center mb-[45px]">
          თანამშრომლის დამატება
        </h3>

        <AddEmployeeForm onClose={closeModal} />

        <button
          onClick={closeModal}
          className="absolute top-10 right-[50px] cursor-pointer"
        >
          <Image
            src={"/icons/close-button.svg"}
            alt="close button"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>,
    modalContainer
  );
}
