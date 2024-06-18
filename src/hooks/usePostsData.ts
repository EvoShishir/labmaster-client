import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function usePostsData() {
  const postsData = useQuery({
    queryKey: ["postData"],
    queryFn: () => axios.get("/api/discussion").then((res) => res.data),
  });
  return postsData;
}

export default usePostsData;
