import { fetchComments } from "@/lib/data-service";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Comment as CommentType } from "@/types/types";

function countComments(comments: CommentType[]): number {
  return comments.reduce((total, comment) => {
    const subCount = comment.sub_comments
      ? countComments(comment.sub_comments)
      : 0;
    return total + 1 + subCount;
  }, 0);
}

export default async function CommentsSection({ taskId }: { taskId: string }) {
  const comments = await fetchComments(taskId);
  return (
    <section className="mt-[200px] mb-[376px] pt-10 px-[45px] bg-purple-bg rounded-[10px] border-[0.3px] border-purple-border">
      <CommentForm taskId={Number(taskId)} />
      <div className="mt-[66px]">
        <h4 className="text-xl font-medium leading-[100%] mb-10">
          კომენტარები
          <span className="text-sm bg-primary text-white rounded-full px-[11px] py-[3px] ml-2">
            {countComments(comments)}
          </span>
        </h4>

        {comments.length > 0 && (
          <div className="flex flex-col gap-[38px]">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment.id} taskId={taskId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
