import { supabase } from "@/lib/suspabse";
import type { LoginFormData, RegisterFormData } from "@/schema/authSchema";

export const signupApi = async (payload: RegisterFormData) => {
  const { email, password, name } = payload;
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error || !user) {
    throw new Error(error?.message);
  }

  if (user?.id) {
    const { data: userProfile, error: userProfileError } = await supabase
      .from("users")
      .insert([
        {
          email,
          name,
        },
      ])
      .select()
      .single();

    if (userProfileError || !userProfile) {
      throw new Error(userProfileError?.message);
    }
    return userProfile;
  }
};
// Get Current User
export const getCurrentUserApi = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  if (user) {
    const { data: userProfile, error: userProfileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .eq("email", user.email)
      .single();

    if (userProfileError || !userProfile) {
      throw new Error(userProfileError?.message);
    }
    return userProfile;
  }
};

// Login API

export const loginApi = async (payload: LoginFormData) => {
  const { email, password } = payload;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw new Error(error?.message);
  }

  return data;
};

// Logout API
export const logoutApi = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
