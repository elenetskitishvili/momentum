import { fetchComments } from "@/lib/data-service";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

export default async function CommentsSection({ taskId }: { taskId: string }) {
  const comments = await fetchComments(taskId);
  console.log(comments);
  return (
    <section className="mt-[200px] pt-10 px-[45px] bg-purple-bg rounded-[10px] border-[0.3px] border-purple-border">
      <AddCommentForm />
      <div className="mt-[66px]">
        <h4 className="text-xl font-medium leading-[100%]">
          კომენტარები
          <span className="text-sm bg-primary text-white rounded-full px-[11px] py-[3px] ml-2">
            {comments.length}
          </span>
        </h4>

        {comments.length > 0 && (
          <div className="flex flex-col gap-[38px] mt-10">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
