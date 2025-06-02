import { useForm } from "react-hook-form";
import { useAuth } from "../queries/use-auth-queries";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../schemas/auth-schemas";

const SignInForm = () => {
  const { signIn, isSigningIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: SignInFormData) => {
    signIn({ email: values.email, password: values.password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} p={8}>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input placeholder="Email" {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button colorScheme="green" type="submit">
          {isSigningIn ? "Signing In..." : "Sign In"}
        </Button>
      </Stack>
    </form>
  );
};

export default SignInForm;
