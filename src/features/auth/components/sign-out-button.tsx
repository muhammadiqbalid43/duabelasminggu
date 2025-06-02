import { useAuth } from "@/contexts/auth-context";
import { Button, type ButtonProps } from "@chakra-ui/react";
import type React from "react";

interface SignOutButtonProps extends Omit<ButtonProps, "onClick"> {
  children: React.ReactNode;
}

const SignOutButton = ({
  children = "Sign Out",
  ...props
}: SignOutButtonProps) => {
  const { signOut, loading } = useAuth();
  return (
    <Button
      onClick={signOut}
      loading={loading}
      loadingText="Signing Out..."
      {...props}
    >
      {children}
    </Button>
  );
};

export default SignOutButton;
