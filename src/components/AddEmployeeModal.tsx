"use client";

import { useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import Image from "next/image";

export default function AddEmployeeModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="py-[11px] px-5 text-base font-normal leading-[100%] rounded-[5px] border border-primary text-primary-text cursor-pointer hover:border-primary-light transition-colors duration-200 ease-in-out"
      >
        თანამშრომლის შექმნა
      </button>

      {isModalVisible && (
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
        </div>
      )}
    </>
  );
}
