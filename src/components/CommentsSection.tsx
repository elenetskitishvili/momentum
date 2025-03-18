import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

export default function CommentsSection() {
  return (
    <section className="mt-[200px] pt-10 px-[45px] bg-purple-bg rounded-[10px] border-[0.3px] border-purple-border">
      <AddCommentForm />
      <div className="mt-[66px]">
        <h4 className="text-xl font-medium leading-[100%]">
          კომენტარები
          <span className="text-sm bg-primary text-white rounded-full px-[11px] py-[3px] ml-2">
            3
          </span>
        </h4>

        <div className="flex flex-col gap-[38px] mt-10">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </section>
  );
}
