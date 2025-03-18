"use client";
import React, { useRef } from "react";

export default function AddCommentForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "TEXTAREA" && target.tagName !== "BUTTON") {
      textareaRef.current?.focus();
    }
  };
  return (
    <form
      onClick={handleFormClick}
      className="bg-white border-[0.3px] border-border-grey-darkest rounded-[10px] h-[135px] flex flex-col focus-within:border-primary transition-colors duration-200 ease-in-out cursor-pointer"
    >
      <textarea
        ref={textareaRef}
        placeholder="დაწერე კომენტარი"
        className="text-sm pl-5 pt-5 w-full flex-grow outline-none resize-none"
      />
      <button
        type="submit"
        className="self-end mb-[15px] mr-5 text-white font-normal text-base leading-[100%] rounded-full bg-primary hover:bg-primary-light transition-colors duration-300 ease-in-out cursor-pointer py-2 px-[19px]"
      >
        დააკომენტარე
      </button>
    </form>
  );
}
