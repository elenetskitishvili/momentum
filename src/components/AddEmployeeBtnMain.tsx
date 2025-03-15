"use client";

import { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";

export default function AddEmployeeBtnMain() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => setIsModalVisible(true);

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
        type="button"
        onClick={openModal}
        className=" py-[11px] px-5 text-base font-normal leading-[100%] rounded-[5px] border border-primary text-primary-text cursor-pointer hover:border-primary-light transition-colors duration-200 ease-in-out"
      >
        თანამშრომლის შექმნა
      </button>

      {isModalVisible && (
        <AddEmployeeModal closeModal={closeModal} isClosing={isClosing} />
      )}
    </>
  );
}
