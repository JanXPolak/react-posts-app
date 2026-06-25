import { createContext } from "react";

interface PostsContextType {
  onEditHandler: (id: string, title: string, body: string) => void;
}

export const PostsContext = createContext<PostsContextType>({
  onEditHandler: () => {},
});
