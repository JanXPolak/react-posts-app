"use client";

import AddPost from "./features/posts/AddPost";
import ListPosts from "./features/list/ListPost/ListPosts";
import { PostsContext } from "./store/PostsContext";
import ErrorToast from "./features/toast/ErrorToast";
import { ErrorContext } from "./store/ErrorContext";
import { Toaster } from "sonner";
import { usePosts } from "./hooks/usePosts";
const ProjectApp = () => {
  const {
    isAPIError,
    isLoading,
    isPostsError,
    onAddHandler,
    onDeleteHandler,
    onEditHandler,
    onToggleFavoriteHandler,
    posts,
    setError,
  } = usePosts();

  if (isPostsError) {
    return (
      <p className="p-8 text-center text-red-600">
        Could not load posts. Try refreshing the page.
      </p>
    );
  }

  if (isLoading) {
    return <p className="p-8 text-center text-gray-500">Loading posts...</p>;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <ErrorContext value={{ isError: isAPIError, setIsError: setError }}>
        <ErrorToast />
        <AddPost onAddHandler={onAddHandler} />
        <PostsContext value={{ onEditHandler }}>
          <ListPosts
            posts={posts}
            onDeleteHandler={onDeleteHandler}
            onToggleFavoriteHandler={onToggleFavoriteHandler}
          />
        </PostsContext>
      </ErrorContext>
    </div>
  );
};

export default ProjectApp;
