"use server";

import { cookies, headers } from "next/headers";
import { createClient } from "../supabase/server";
import { redis } from "../upstash";

export const trackProgress = async (progress: number) => {
  try {
    let pathname = headers().get("x-pathname");
    pathname = pathname?.split("/").pop() || null;

    if (!pathname)
      return {
        title: "Error",
        message: "No pathname found",
      };

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Error", {
        cause: "Error fetching user data",
      });
    }

    if (!user) {
      throw new Error("User not found", {
        cause: "User not found in the database",
      });
    }

    const { id } = user.user;

    const data = await redis.set(`${id}-${pathname}`, `${progress}`);

    console.log(data);

    if (data !== "OK") {
      throw new Error("Error", {
        cause: "Error saving progress data",
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        title: "Error",
        message: err.message,
      };
    }

    return {
      title: "Error",
      message: "An unknown error occurred",
    };
  }
};

export const getProgress = async (id: number | null = null) => {
  try {
    let pathname;

    if (!id) {
      pathname = headers().get("x-pathname");
      pathname = pathname?.split("/").pop() || null;

      if (!pathname) {
        return {
          title: "Error",
          message: "No pathname found",
        };
      }
    } else {
      pathname = id;
    }

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Error", {
        cause: "Error fetching user data",
      });
    }

    if (!user) {
      throw new Error("User not found", {
        cause: "User not found in the database",
      });
    }

    const { id: userID } = user.user;

    const data = await redis.get(`${userID}-${pathname}`);

    if (!data) {
      throw new Error("Not Found", {
        cause: "No progress data found for the user and pathname",
      });
    }

    const progress = parseFloat(data as string);
    return progress;
  } catch (err) {
    if (err instanceof Error) {
      return {
        title: "Error",
        message: err.message,
      };
    }

    return {
      title: "Error",
      message: "An unknown error occurred",
    };
  }
};

export const clearProgress = async () => {
  try {
    let pathname = headers().get("x-pathname");
    pathname = pathname?.split("/").pop() || null;

    if (!pathname)
      return {
        title: "Error",
        message: "No pathname found",
      };

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error("Error", {
        cause: "Error fetching user data",
      });
    }

    if (!user) {
      throw new Error("User not found", {
        cause: "User not found in the database",
      });
    }

    const { id } = user.user;

    const exists = await redis.exists(`${id}-${pathname}`);

    if (exists) {
      const data = await redis.del(`${id}-${pathname}`);

      if (!data) {
        throw new Error("Not Found", {
          cause: "No progress data found for the user and pathname",
        });
      }
    }
    await supabase
      .from("blog")
      .update({ isCompleted: true })
      .eq("id", pathname);

    return {
      title: "Success",
      message: "You have completed for this blog post",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        title: "Error",
        message: err.message,
      };
    }

    return {
      title: "Error",
      message: "An unknown error occurred",
    };
  }
};
