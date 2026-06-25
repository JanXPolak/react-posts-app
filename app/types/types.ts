export interface IPost{
    id: string,
    body: string,
    title: string,
    createdAt: string,
    isFavorite: boolean
}

export enum SortOption{
    alphabetically = "alphabetically",
    newest = "newest",
    oldest = "oldest"
}