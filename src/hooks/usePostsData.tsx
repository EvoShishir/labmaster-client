import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function usePostsData() {
  const postsData = useQuery({
    queryKey: ["postData"],
    queryFn: () =>
      axios
        .get("https://dummyjson.com/posts?limit=10&skip=10&select=title")
        .then((res) => res.data),
  });
  return postsData;
}

export default usePostsData;
