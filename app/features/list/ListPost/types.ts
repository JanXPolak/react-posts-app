import { IPost } from "@/app/types/types";

export interface ListPostPropsBase{
    posts: IPost[];
    onDeleteHandler: (id: string) => void;
}