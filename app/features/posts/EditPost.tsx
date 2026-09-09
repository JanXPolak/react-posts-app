import { FC, useContext, useState } from "react";
import { IPost } from "../../types/types";
import { PostsContext } from "../../store/PostsContext";
import { isPostFormValid } from "../../validation/validation";
import { REQUIRED_POST_TITLE_AND_BODY_LENGTH } from "@/app/validation/consts";

interface Props {
  selectedPost: IPost;
  onClickCancelEditPost: () => void;
}

const EditPost: FC<Props> = ({ selectedPost, onClickCancelEditPost }) => {
  const [inputTitle, setInputTitle] = useState(selectedPost.title);
  const [inputBody, setInputBody] = useState(selectedPost.body);

  const isPostFormOk = isPostFormValid(selectedPost.title, selectedPost.body);
  const [isError, setIsError] = useState(!isPostFormOk);
  const { onEditHandler } = useContext(PostsContext);

  return (
    <form
      className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4"
      onSubmit={(e) => {
        e.preventDefault();

        if (!isPostFormValid(inputTitle, inputBody)) {
          setIsError(true);
          return;
        }

        onEditHandler(selectedPost.id, inputTitle.trim(), inputBody.trim());
        onClickCancelEditPost();
      }}
    >
      <h6 className="mb-3 text-sm font-semibold text-gray-700">Edit post</h6>
      <div className="mb-3">
        <p className="mb-1 block text-xs font-medium text-gray-500">Title</p>
        <input
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          value={inputTitle}
          onChange={(e) => {
            const title = e.target.value;
            setInputTitle(title);
            setIsError(!isPostFormValid(title, inputBody));
          }}
        />
      </div>
      <div className="mb-4">
        <p className="mb-1 block text-xs font-medium text-gray-500">Content</p>
        <textarea
          className="h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          value={inputBody}
          onChange={(e) => {
            const body = e.target.value;
            setInputBody(body);
            setIsError(!isPostFormValid(inputTitle, body));
          }}
        />
      </div>
      {isError && (
        <p className="mb-3 text-sm font-medium text-red-500">
          You can&apos;t edit the post. Title and content must be at least{" "}
          {REQUIRED_POST_TITLE_AND_BODY_LENGTH} characters.
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isError}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
        >
          Save changes
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          onClick={() => onClickCancelEditPost()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPost;
