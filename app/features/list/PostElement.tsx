import { FC } from "react";
import { IPost } from "../../types/types";

interface Props {
  post: IPost;
  onClickPostHandler: (post: IPost) => void;
  onToggleFavoriteHandler: (id: string) => void;
}

const PostElement: FC<Props> = ({
  post,
  onClickPostHandler,
  onToggleFavoriteHandler,
}) => {
  return (
    <div
      key={post.id}
      className="relative mb-4 cursor-pointer rounded border p-4 pr-12 hover:bg-gray-100"
      onClick={() => onClickPostHandler(post)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavoriteHandler(post.id);
        }}
        className="absolute right-3 top-3 text-xl"
      >
        {post.isFavorite ? "⭐" : "☆"}
      </button>

      <h5 className="text-xl">{post.title}</h5>
      <p className="text-xs">({post.createdAt})</p>
      <p>{post.body}</p>
    </div>
  );
};

export default PostElement;
