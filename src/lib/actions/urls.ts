"use server";

import { FormState } from "@/components/form";
import { z } from "zod";
import { isUrlValid } from "../utils";
import { getTitlesFromURL } from "../converter";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

const MDXActionSchema = z.object({
  url: z.string(),
});

// Handle the MDX action

export const handleMDXAction = async (
  _: any,
  data: FormData,
): Promise<FormState | void> => {
  try {
    const formData = Object.fromEntries(data);

    const parsed = MDXActionSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.errors.map(
        (error) => `${error.path[0]} : ${error.message.toLowerCase()}`,
      );

      throw new Error("Invalid form data", {
        cause: "The Following Errors Occurred:\n" + errors.join("\n"),
      });
    }

    let operationSuccess = isUrlValid(parsed.data.url);

    console.log("operationSuccess", operationSuccess);

    if (!operationSuccess) {
      throw new Error("Invalid URL", {
        cause: "The URL provided is not valid",
      });
    }

    const title = await getTitlesFromURL(parsed.data.url);

    if (!title) {
      throw new Error("No title found", {
        cause: "No title found for the URL provided",
      });
    }

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: blog, error } = await supabase
      .from("blog")
      .insert([{ title, blog_url: parsed.data.url }])
      .select();

    if (error) {
      console.log(error);
      throw new Error("Database Error", {
        cause: "An error occurred while writing to the database",
      });
    }

    return {
      description: "Redirecting...",
      redirect: `/blog/${blog[0].id}`,
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
      description: "Please try again later",
    };
  }
};
