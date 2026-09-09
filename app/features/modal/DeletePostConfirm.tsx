import { FC } from "react";

interface Props{
    onClickConfirmDeletePost: () => void,
    onClickCancelDeletingPost: () => void,
}

const DeletePostConfirm:FC<Props> = ({ onClickConfirmDeletePost, onClickCancelDeletingPost }) => {
  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="mb-3 text-sm text-red-700">
        Are you sure you want to delete this post?
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onClickConfirmDeletePost()}
          className="cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
        >
          Yes, delete
        </button>

        <button
          onClick={() => onClickCancelDeletingPost()}
          className="cursor-pointer rounded border px-3 py-1 text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostConfirm;
