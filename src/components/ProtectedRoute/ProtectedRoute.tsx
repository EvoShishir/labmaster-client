import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import useFindUser from "@/hooks/useFindUser";
import LoadingSpinner from "@/components/Core/LoadingSpinner/LoadingSpinner";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, error, isLoading } = useFindUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && !error) {
      router.push("/login");
    }
  }, [user, error, isLoading, router]);

  if (isLoading || (!user && !error)) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
