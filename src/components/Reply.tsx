import React from "react";
import ReplyIcon from "./ReplyIcon";

interface ReplyProps {
  onReplyClick: () => void;
}

export default function Reply({ onReplyClick }: ReplyProps) {
  return (
    <button
      onClick={onReplyClick}
      className="flex items-center gap-1.5 text-primary hover:text-primary-light transition-colors duration-300 ease-in-out py-1.5 cursor-pointer"
    >
      <ReplyIcon />
      <span>უპასუხე</span>
    </button>
  );
}
