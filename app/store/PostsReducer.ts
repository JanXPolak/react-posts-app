import { IPost } from "../types/types";

interface IAction {
    type: "fetch" | "add" | "delete" | "edit" | "toggleFavorite";
    payload: any;
}

export function postsReducer(posts: IPost[], action: IAction) {
    switch (action.type) {
        case "fetch": {
            return action.payload;
        }
        case "add": {
            return [...posts, action.payload]

        }
        case "delete": {
            const newPosts: IPost[] = posts.filter((post) => post.id !== action.payload.id)
            return newPosts
        }
        case "edit": {
            return posts.map((post) => {
                if (post.id !== action.payload.id) return post;
                return {
                    ...post,
                    title: action.payload.title,
                    body: action.payload.body,
                };
            });
        }
        case "toggleFavorite": {
            return posts.map((post) => {
                if (post.id !== action.payload.id) return post;

                return {
                    ...post,
                    isFavorite: !post.isFavorite
                }
            })
        }
        default: {
            return posts
        }
    }
}