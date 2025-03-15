import Image from "next/image";
import { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";

export default function AddEmployeeBtnSecondary() {
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
        className="w-full h-full py-2.5 px-3.5 flex items-center gap-2 cursor-pointer"
      >
        <Image
          src={"/icons/plus-in-circle.svg"}
          alt="plus in circle icon"
          width={18}
          height={18}
        />
        <span className="text-primary text-base">დაამატე თანამშრომელი</span>
      </button>

      {isModalVisible && (
        <AddEmployeeModal closeModal={closeModal} isClosing={isClosing} />
      )}
    </>
  );
}
