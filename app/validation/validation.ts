import { IPost } from "../types/types";

export function postDataValidator(posts: any) {
    const newPosts: IPost[] = []
    if (Array.isArray(posts) && posts != null) {
        for (let i = 0; i < posts.length; i++) {
            if (typeof posts[i] === "object" && posts[i] !== null) {
                const obj = posts[i]
                if (doesObjIncludesEveryKey(obj)) {
                    if (isIdOk(obj.id) &&
                        isTitleOk(obj.title) &&
                        typeof obj.body === "string" &&
                        isCreatedAtOk(obj.createdAt) &&
                        typeof obj.isFavorite === "boolean"
                    ) {
                        newPosts.push(obj)
                    }
                }
            }
        }
    }
    console.log(newPosts)
    return newPosts as IPost[]
}

function doesObjIncludesEveryKey(obj: object) {
    const MUST_KEYS = ["id", "title", "body", "createdAt", "isFavorite"]
    let numOfCorrectKeys = 0
    const NUM_OF_MINIMAL_CORRECT_KEYS = MUST_KEYS.length
    for (let i = 0; i < Object.keys(obj).length; i++) {
        const key = Object.keys(obj)[i];
        if (MUST_KEYS.includes(key)) numOfCorrectKeys++;
    }
    return numOfCorrectKeys === NUM_OF_MINIMAL_CORRECT_KEYS
}

function isIdOk(id: any) {
    return id !== ""
}

function isTitleOk(title: any) {
    return typeof title === "string" && title !== ""
}

function isCreatedAtOk(createdAt: any) {
    const REQUIRED_DATE_LENGTH = 10
    if (typeof createdAt !== "string" && createdAt.length != REQUIRED_DATE_LENGTH && !createdAt.includes('-') && createdAt.split('-').length != 3) return false;

    const year = createdAt.split('-')[0]
    const month = createdAt.split('-')[1]
    const day = createdAt.split('-')[2]

    const isYearOk = !isNaN(Number(year)) && Number(year) >= 2020 && Number(year) <= 2026
    const isMonthOk = !isNaN(Number(month)) && Number(month) > 0 && Number(month) <= 12
    const isDayOk = !isNaN(Number(day)) && Number(day) > 0 && Number(day) <= 31

    if (isYearOk && isMonthOk && isDayOk) return true
    else return false
}

export function isPostFormValid(title: string, body: string) {
    const isTitleOk = title.trim() != "" && title.trim().length > 3;
    const isBodyOk = body.trim() != "" && body.trim().length > 3;
    return isTitleOk && isBodyOk;
}