"use client";
import type { Comment } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import CommentForm from "./CommentForm";
import Reply from "./Reply";

export default function Comment({
  comment,
  taskId,
}: {
  comment: Comment;
  taskId: string;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3 max-w-[598px]">
      <div className="flex items-start gap-3">
        <Image
          src={comment.author_avatar}
          alt={comment.author_nickname}
          width={38}
          height={38}
          className="object-cover rounded-full"
        />
        <div>
          <p className="text-lg font-medium text-primary-text mb-2">
            {comment.author_nickname}
          </p>
          <p className="text-light-text font-[350] text-base leading-[100%] mb-2.5">
            {comment.text}
          </p>
          <Reply onReplyClick={handleReplyClick} />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          showReplyForm ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CommentForm
          taskId={Number(taskId)}
          parentId={comment.id}
          placeholder="დაწერე პასუხი"
          className="ml-10"
          buttonText="უპასუხე"
        />
      </div>

      {[...(comment.sub_comments ?? [])].reverse().map((subComment) => (
        <div
          key={subComment.id}
          className="ml-10 flex items-start gap-3 mb-2.5"
        >
          <Image
            src={subComment.author_avatar}
            alt={subComment.author_nickname}
            width={38}
            height={38}
            className="object-cover rounded-full"
          />
          <div>
            <p className="text-lg font-medium text-primary-text mb-2">
              {subComment.author_nickname}
            </p>
            <p className="text-light-text font-[350] text-base leading-[100%] mb-2.5">
              {subComment.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
