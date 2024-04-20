"use server";

import { FormState } from "@/components/form";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "../supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function handleLogin(_: any, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  try {
    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.errors.map(
        (error) => `${error.path[0]} : ${error.message.toLowerCase()}`,
      );

      throw new Error("Invalid Data", {
        cause: "The Following Errors Occurred:\n" + errors.join("\n"),
      });
    }

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: _, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      throw new Error("Error signing in", {
        cause: error.message,
      });
    }

    return {
      type: "success",
      title: "Success",
      description: "You have successfully signed in",
      redirect: "/",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        type: "error",
        title: e.message,
        description: e.cause as string,
      };
    }
    return {
      type: "error",
      title: "An error occurred",
      description: "An unknown error occurred",
    };
  }
}

export async function handleSignUp(_: any, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  try {
    const parsed = loginSchema.safeParse(formData);

    console.log(parsed);

    if (!parsed.success) {
      const errors = parsed.error.errors.map(
        (error) => `${error.path[0]} : ${error.message.toLowerCase()}`,
      );

      throw new Error("Invalid Data", {
        cause: "The Following Errors Occurred:\n" + errors.join("\n"),
      });
    }

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      throw new Error("Error signing up", {
        cause: error.message,
      });
    }

    return {
      type: "success",
      title: "Success",
      description: "You have successfully signed up",
      redirect: "/",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        type: "error",
        title: e.message,
        description: e.cause as string,
      };
    }
    return {
      type: "error",
      title: "An error occurred",
      description: "An unknown error occurred",
    };
  }
}

export const handleSignout = async () => {
  try {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error signing out", {
        cause: error.message,
      });
    }

    return {
      type: "success",
      title: "Success",
      description: "You have successfully signed out",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        type: "error",
        title: e.message,
        description: e.cause as string,
      };
    }
    return {
      type: "error",
      title: "An error occurred",
      description: "An unknown error occurred",
    };
  }
};
