import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useAuth } from "../queries/use-auth-queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "../schemas/auth-schemas";
const SignUpForm = () => {
  const { signUp, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpFormData) => {
    signUp({
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} p={8}>
        <Field.Root invalid={!!errors.fullName}>
          <Field.Label>Full Name</Field.Label>
          <Input placeholder="Full Name" {...register("fullName")} />
          <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input placeholder="Email" {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button colorScheme="green" type="submit">
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
