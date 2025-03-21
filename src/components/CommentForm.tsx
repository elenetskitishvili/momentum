"use client";
import { useRef, useState } from "react";
import { addComment } from "@/actions/addComment";

interface CommentFormProps {
  taskId: number;
  parentId?: number | null;
  placeholder?: string;
  className?: string;
  buttonText?: string;
}

export default function CommentForm({
  taskId,
  parentId = null,
  placeholder = "დაწერე კომენტარი",
  className = "",
  buttonText = "დააკომენტარე",
}: CommentFormProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "TEXTAREA" && target.tagName !== "BUTTON") {
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    try {
      await addComment({ text, parent_id: parentId, taskId });
      setText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onClick={handleFormClick}
      onSubmit={handleSubmit}
      className={`bg-white border-[0.3px] border-border-grey-darkest rounded-[10px] h-[135px] flex flex-col focus-within:border-primary transition-colors duration-200 ease-in-out cursor-pointer ${className}`}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="text-sm pl-5 pt-5 w-full flex-grow outline-none resize-none"
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="self-end mb-[15px] mr-5 text-white font-normal text-base leading-[100%] rounded-full bg-primary hover:bg-primary-light transition-colors duration-300 ease-in-out cursor-pointer py-2 px-[19px]"
      >
        {loading ? "იგზავნება..." : buttonText}
      </button>
    </form>
  );
}
