import { useEffect, useReducer, useState } from "react";
import { deletePost, patchFavorite, patchPost, postPost } from "../services/postsApi";
import { toast } from "sonner";
import useFetchPosts from "./useFetchPosts";
import { postsReducer } from "../store/PostsReducer";

export const usePosts = () => {

    const {
        posts: fetchedPosts,
        isError: isPostsError,
        isLoading,
      } = useFetchPosts();

    const [posts, dispatch] = useReducer(postsReducer, fetchedPosts);
    const [isAPIError, setIsAPIError] = useState(false);
  
    useEffect(() => {
      dispatch({
        type: "fetch",
        payload: fetchedPosts,
      });
    }, [fetchedPosts]);
  
    async function onAddHandler(title: string, body: string) {
      try {
        const createdPost = await postPost(title, body);
        dispatch({
          type: "add",
          payload: createdPost,
        });
        toast.success("Post added successfully");
      } catch (error) {
        console.error("Failed to add the post", error);
        toast.error("Failed to add the post");
        setIsAPIError(true);
      }
    }
    async function onDeleteHandler(id: string) {
      try {
        await deletePost(id);
        dispatch({
          type: "delete",
          payload: {
            id,
          },
        });
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Failed to delete the post", error);
        toast.error("Failed to delete the post");
        setIsAPIError(true);
      }
    }
  
    async function onEditHandler(id: string, title: string, body: string) {
      try {
        const updatedPost = await patchPost(id, title, body);
        dispatch({
          type: "edit",
          payload: {
            id: updatedPost.id,
            title: updatedPost.title,
            body: updatedPost.body,
          },
        });
        toast.success("Post edited successfully");
      } catch (error) {
        console.error("Failed to edit the post", error);
        toast.error("Failed to edit the post");
        setIsAPIError(true);
      }
    }
  
    async function onToggleFavoriteHandler(id: string) {
      const post = posts.find((post) => post.id === id);
      if (post === undefined) {
        setIsAPIError(true);
        return;
      }
      try {
        await patchFavorite(id, !post.isFavorite);
        dispatch({
          type: "toggleFavorite",
          payload: {
            id,
          },
        });
  
        toast.success(
          post.isFavorite
            ? "Post removed from favorites"
            : "Post added to favorites"
        );
      } catch (error) {
        console.error("Failed to change the post's favorite state", error);
        toast.error(post.isFavorite ?
          "Failed to remove the post from favorites" :
          "Failed to add the post to favorites"
        );
        setIsAPIError(true);
      }
    }
  
    function setError(isError: boolean) {
      setIsAPIError(isError);
    }

    return {
        setError,
        isPostsError,
        isLoading,
        isAPIError,
        onAddHandler,
        onEditHandler,
        posts,
        onDeleteHandler,
        onToggleFavoriteHandler
    }

}