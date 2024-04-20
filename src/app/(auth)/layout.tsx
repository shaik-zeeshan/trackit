import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  return <>{children}</>;
}
