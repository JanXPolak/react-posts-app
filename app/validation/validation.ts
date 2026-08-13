import { IPost } from "../types/types";
import { REQUIRED_POST_TITLE_AND_BODY_LENGTH } from "./consts";

import * as z from "zod";

const PostSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    createdAt: z.iso.date(),
    isFavorite: z.boolean(),
});

const TitleAndBodySchema = z.string().trim().min(REQUIRED_POST_TITLE_AND_BODY_LENGTH);

export function postDataValidator(posts: any): IPost[] {
    if (!Array.isArray(posts)) {
        return [];
    }

    const validPosts: IPost[] = []
    const invalidPosts = []

    for (let i = 0; i < posts.length; i++) {
        const result = PostSchema.safeParse(posts[i])
        if (!result.success) {
            invalidPosts.push(posts[i])
        } else {
            const post = result.data
            validPosts.push(post)
        }

    }
    if (invalidPosts.length !== 0) {
        console.log("Found invalid posts in database:", invalidPosts);
    }

    return validPosts
}

export function isPostFormValid(title: string, body: string) {
    try {
        TitleAndBodySchema.parse(title)
        TitleAndBodySchema.parse(body)
    } catch (error) {
        return false
    }
    return true
}