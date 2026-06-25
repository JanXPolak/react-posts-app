"use client"

import { useEffect, useReducer, useState } from "react";
import useFetchPosts from "./hooks/useFetchPosts";
import AddPost from "./features/posts/AddPost";
import {
  deletePost,
  patchFavorite,
  patchPost,
  postPost,
} from "./services/postsApi";
import ListPosts from "./features/list/ListPosts";
import { postsReducer } from "./store/PostsReducer";
import { PostsContext } from "./store/PostsContext";
import { toast, Toaster } from "sonner";
import ErrorToast from "./features/toast/ErrorToast";
import { ErrorContext } from "./store/ErrorContext";

const ProjectApp = () => {
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
      if (createdPost === undefined) {
        setIsAPIError(true);
        return;
      }
      dispatch({
        type: "add",
        payload: createdPost,
      });
      toast.success("Pomyślnie dodano post");
    } catch (error) {
      console.error("Nie udało się dodać posta", error);
      toast.error("Nie udało się dodać posta");
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
      toast.success("Pomyślnie usunięto post");
    } catch (error) {
      console.error("Nie udało się usunąć posta", error);
      toast.error("Nie udało się usunąć posta");
      setIsAPIError(true);
    }
  }

  async function onEditHandler(id: string, title: string, body: string) {
    try {
      const updatedPost = await patchPost(id, title, body);
      if (updatedPost === undefined) {
        setIsAPIError(true);
        return;
      }
      dispatch({
        type: "edit",
        payload: {
          id: updatedPost.id,
          title: updatedPost.title,
          body: updatedPost.body,
        },
      });
      toast.success("Pomyślnie edytowano post");
    } catch (error) {
      console.error("Nie udało się edytować posta", error);
      toast.error("Nie udało się edytować posta");
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
          ? "Usunięto post z ulubionych"
          : "Dodano post do ulubionych"
      );
    } catch (error) {
      console.error("Nie udało się zmienić stanu ulubionego posta", error);
      toast.error(post.isFavorite ?
        "Nie udało się usunąć postu do ulubionych" :
        "Nie udało się dodać postu do ulubionych"
      );
      setIsAPIError(true);
    }
  }

  function setError(isError: boolean) {
    setIsAPIError(isError);
  }

  if (isPostsError) {
    return <p>Wystapił błąd podczas wczytywania danych.</p>;
  }


  if (isLoading) {
    return <p>Ładowanie...</p>;
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
