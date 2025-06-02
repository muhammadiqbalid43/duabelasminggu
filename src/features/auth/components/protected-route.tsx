import type { ReactNode } from "react";
import { useSession } from "../hooks/use-sessions";
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (!session) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
