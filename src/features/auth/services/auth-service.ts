import supabase from "@/lib/supabase-client";

export const authService = {
  async signUp({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName?: string;
  }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const user = data.user;
    if (!user) {
      alert("User not found after signup");
      return;
    }

    try {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
      });

      if (insertError) {
        console.error("Profile insertion error:", insertError.message);
        alert(
          `Sign up successful, but profile creation failed: ${insertError.message}`
        );
      } else {
        console.log("User signed up and profile created successfully!");
      }
    } catch (dbError) {
      console.error("Unexpected error during profile insertion:", dbError);
      alert("An unexpected error occurred during profile creation.");
    }

    return { user: data.user };
  },

  async signIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
