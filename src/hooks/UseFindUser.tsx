import { findUser } from "@/userActions";
import { useEffect, useState } from "react";

export type User = {
  displayName: string;
};

type HookResult = {
  user: User | undefined;
  error: Error | null;
};

const useFindUser = (): HookResult => {
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await findUser();
      if (userData) {
        const { displayName } = userData as User;
        setUser({ displayName });
      } else {
        setUser(undefined);
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  return { user, error };
};

export default useFindUser;
