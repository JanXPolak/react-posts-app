import { FC, useState } from "react";
import ListSorter from "./ListSorter";
import PostModal from "../modal/PostModal";
import PostElement from "./PostElement";
import { IPost, SortOption } from "../../types/types";
import ShowOnlyFavoriteCheckbox from "./ShowOnlyFavoriteCheckbox";

interface Props {
  posts: IPost[];
  onDeleteHandler: (id: string) => void;
  onToggleFavoriteHandler: (id: string) => void;
}

const NO_POST_SELECTED = "-1";

const ListPosts: FC<Props> = ({
  posts,
  onDeleteHandler,
  onToggleFavoriteHandler,
}) => {
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

  // ===========================

  if (posts.length === 0) {
    return <p>Brak danych.</p>;
  }

  return (
    <div>
      <ListSorter onChangeSorting={onChangeSorting} />
      <ShowOnlyFavoriteCheckbox
        showOnlyFavorite={showOnlyFavorite}
        onChangeShowOnlyFavorite={onChangeShowOnlyFavorite}
      />
      <div className="max-w-2xl">
        {visiblePosts.map((post) => {
          return (
            <PostElement
              key={post.id}
              post={post}
              onClickPostHandler={onClickPostHandler}
              onToggleFavoriteHandler={onToggleFavoriteHandler}
            />
          );
        })}
      </div>
      <PostModal
        selectedPost={selectedPost}
        NO_POST_SELECTED={NO_POST_SELECTED}
        idPostToDelete={idPostToDelete}
        onClickEditPostButton={onClickEditPostButton}
        onClickCancelDeletingPost={onClickCancelDeletingPost}
        onClickCloseModal={onClickCloseModal}
        onClickConfirmDeletePost={onClickConfirmDeletePost}
        onClickDeletePost={onClickDeletePost}
      />
    </div>
  );
};

export default ListPosts;
