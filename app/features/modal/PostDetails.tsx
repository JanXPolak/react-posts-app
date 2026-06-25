import React, { FC } from "react";
import { IPost } from "../../types/types";


interface Props{
    selectedPost: IPost
}

const PostDetails:FC<Props> = ({ selectedPost }) => {
  return (
    <div>
      <h5 className="text-xl">{selectedPost.title}</h5>
      <p className="text-xs">({selectedPost.createdAt})</p>
      <p>{selectedPost.body}</p>
      <p className="font-bold">id: {selectedPost.id}</p>
      <p className="font-bold">isFavorite: {selectedPost.isFavorite ? "tak" : "nie"}</p>
    </div>
  );
};

export default PostDetails;
