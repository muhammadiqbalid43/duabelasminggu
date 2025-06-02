import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth-service";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      if (data && data.user) {
        navigate("/onboarding");
      }
    },
    onError: (error: Error) => {
      console.error("Sign up failed:", error.message);
    },
  });

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      if (data.user) {
        navigate("/onboarding");
      }
    },
    onError: (error: Error) => {
      console.error("Sign in failed:", error.message);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      console.error("Sign in failed:", error.message);
    },
  });

  return {
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    signIn: signInMutation.mutate,
    isSigningIn: signInMutation.isPending,
    signOut: signOutMutation.mutate,
  };
};
