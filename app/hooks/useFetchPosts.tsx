import { useEffect, useState } from "react";
import { IPost } from "../types/types";
import { postDataValidator } from "../validation/validation";
import { API_URL } from "../constants/constants";

const useFetchPosts = () => {
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        return postDataValidator(result) as IPost[];
      } catch (error) {
        console.log("Wystapil blad podczas fetchowania danych");
        setIsError(true);
        return [];
      } finally {
        setIsLoading(false);
      }
    }

    let ignore = false;
    async function startFetching() {
      const json = await getData();
      if (!ignore) {
        setPosts(json);
      }
    }

    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  return { posts, isError, isLoading };
};

export default useFetchPosts;
