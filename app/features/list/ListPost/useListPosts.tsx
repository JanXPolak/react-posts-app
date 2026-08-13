import { IPost, SortOption } from "@/app/types/types";
import { useState } from "react";
import { NO_POST_SELECTED } from "./consts";
import { ListPostPropsBase } from "./types";

export const useListPosts = (props:ListPostPropsBase) => {

    const { posts, onDeleteHandler } = props

    const [sortOption, setSortOption] = useState<SortOption>(
        SortOption.alphabetically
      );
      const [selectedPostId, setSelectedPostId] = useState(NO_POST_SELECTED);
      const [idPostToDelete, setIdPostToDelete] = useState(NO_POST_SELECTED);
      const [showOnlyFavorite, setShowOnlyFavorite] = useState(false);
    
      const sortedPosts = getSortedPosts(posts, sortOption);
      const selectedPost = posts.find((post) => post.id === selectedPostId);
      const visiblePosts = showOnlyFavorite
        ? sortedPosts.filter((post) => post.isFavorite)
        : sortedPosts;
    
      function getSortedPosts(posts: IPost[], sortOption: SortOption) {
        switch (sortOption) {
          case SortOption.alphabetically:
            return [...posts].sort((a, b) =>
              a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
          case SortOption.newest:
            return [...posts].sort((a, b) =>
              b.createdAt.localeCompare(a.createdAt)
            );
          case SortOption.oldest:
            return [...posts].sort((a, b) =>
              a.createdAt.localeCompare(b.createdAt)
            );
          default:
            return posts;
        }
      }
    
      function onChangeSorting(option: SortOption) {
        setSortOption(option);
      }
    
      function onClickPostHandler(post: IPost) {
        setIdPostToDelete(NO_POST_SELECTED);
        setSelectedPostId(post.id);
      }
    
      function onClickCloseModal() {
        setSelectedPostId(NO_POST_SELECTED);
      }
    
      function onClickDeletePost() {
        if (selectedPost !== undefined) setIdPostToDelete(selectedPost.id);
      }
    
      function onClickConfirmDeletePost() {
        setSelectedPostId(NO_POST_SELECTED);
        setIdPostToDelete(NO_POST_SELECTED);
        onDeleteHandler(idPostToDelete);
      }
    
      function onClickCancelDeletingPost() {
        setIdPostToDelete(NO_POST_SELECTED);
      }
    
      function onClickEditPostButton() {
        setIdPostToDelete(NO_POST_SELECTED);
      }
    
      function onChangeShowOnlyFavorite(nextShowOnlyFavorite: boolean) {
        setShowOnlyFavorite(nextShowOnlyFavorite);
      }

      return {
        onChangeSorting,
        showOnlyFavorite,
        onChangeShowOnlyFavorite,
        onClickPostHandler,
        onClickEditPostButton,
        selectedPost,
        visiblePosts,
        idPostToDelete,
        onClickCancelDeletingPost,
        onClickCloseModal,
        onClickConfirmDeletePost,
        onClickDeletePost
      }

}