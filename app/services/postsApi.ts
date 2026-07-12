import { API_URL } from "../constants/constants";
import { IPost } from "../types/types";


export async function postPost(title: string, body: string) {
  const currentDate = new Date().toISOString().split("T")[0];
  const newPost: IPost = {
    id: "",
    title: title,
    body: body,
    createdAt: currentDate,
    isFavorite: false,
  };
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error("Nie udało się dodać posta");
  }
  return await response.json();
}

export async function deletePost(id: string) {
  const response = await fetch(API_URL + id, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error("Nie udało się usunąć posta");
  }
}

export async function patchPost(id: string, title: string, body: string) {
  const response = await fetch(API_URL + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body
    }),
  });
  if (!response.ok) {
    throw new Error("Nie udało się edytować posta");
  }
  return await response.json();
}

export async function patchFavorite(id: string, isFavorite: boolean) {
  const response = await fetch(API_URL + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite
    }),
  });
  if (!response.ok) {
    throw new Error("Nie udało się zmienić stanu ulubionego posta");
  }
  return await response.json();
}