import { FC } from "react";
import ListSorter from "../ListSorter";
import PostModal from "../../modal/PostModal";
import PostElement from "../PostElement";
import ShowOnlyFavoriteCheckbox from "../ShowOnlyFavoriteCheckbox";
import { NO_POST_SELECTED } from "./consts";
import { ListPostPropsBase } from "./types";
import { useListPosts } from "./useListPosts";

interface Props extends ListPostPropsBase {
  onToggleFavoriteHandler: (id: string) => void;
}

const ListPosts: FC<Props> = ({
  posts,
  onDeleteHandler,
  onToggleFavoriteHandler,
}) => {
  
  const {
    onClickDeletePost,
    onClickConfirmDeletePost,
    onClickCloseModal,
    onClickCancelDeletingPost,
    onClickEditPostButton,
    idPostToDelete,
    onChangeSorting,
    showOnlyFavorite,
    onChangeShowOnlyFavorite,
    visiblePosts,
    onClickPostHandler,
    selectedPost,
  } = useListPosts({ posts, onDeleteHandler });

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
