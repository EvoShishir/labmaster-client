import axios from "axios";
import React, { useEffect, useState } from "react";

type User = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
};

const useFindUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/");
      const userData: User = {
        name: {
          first: data.results[0].name.first,
          last: data.results[0].name.last,
        },
        picture: {
          thumbnail: data.results[0].picture.thumbnail,
        },
      };
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return user;
};

export default useFindUser;
