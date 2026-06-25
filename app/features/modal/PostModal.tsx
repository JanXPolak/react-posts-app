import { FC, useEffect, useState } from "react";

import { IPost } from "../../types/types";
import PostDetails from "./PostDetails";
import EditPost from "../posts/EditPost";
import DeletePostConfirm from "./DeletePostConfirm";

interface Props {
  selectedPost: IPost | undefined;
  NO_POST_SELECTED: string;
  onClickCloseModal: () => void;
  onClickDeletePost: () => void;
  idPostToDelete: string;
  onClickEditPostButton: () => void;
  onClickConfirmDeletePost: () => void;
  onClickCancelDeletingPost: () => void;
}

const PostModal: FC<Props> = ({
  selectedPost,
  NO_POST_SELECTED,
  onClickCloseModal,
  onClickDeletePost,
  idPostToDelete,
  onClickEditPostButton,
  onClickConfirmDeletePost,
  onClickCancelDeletingPost,
}) => {
  const [showingEditPost, setIsShowingEditPost] = useState(false);

  function onClickCancelEditPost() {
    setIsShowingEditPost(false);
  }

  useEffect(() => {
    setIsShowingEditPost(false);
  }, [selectedPost?.id]);

  return (
    <div>
      {selectedPost !== undefined && (
        <div className="fixed right-0 top-0 h-screen w-80 overflow-y-scroll border-l bg-white p-4">
          <button
            onClick={() => onClickCloseModal()}
            className="cursor-pointer mb-6 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
          >
            Zamknij
          </button>
          <PostDetails selectedPost={selectedPost} />
          <div className="mt-8 flex gap-2">
            <button
              className="cursor-pointer flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              onClick={() => {
                setIsShowingEditPost(true);
                onClickEditPostButton();
              }}
            >
              Edytuj post
            </button>
            <button
              className="cursor-pointer flex-1 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              onClick={() => {
                onClickDeletePost();
                setIsShowingEditPost(false);
              }}
            >
              Usuń post
            </button>
          </div>
          {idPostToDelete !== NO_POST_SELECTED && (
            <DeletePostConfirm
              onClickConfirmDeletePost={onClickConfirmDeletePost}
              onClickCancelDeletingPost={onClickCancelDeletingPost}
            />
          )}
          {showingEditPost && (
            <EditPost
              selectedPost={selectedPost}
              onClickCancelEditPost={onClickCancelEditPost}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostModal;
