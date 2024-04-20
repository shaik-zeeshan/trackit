import { Navbar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ClassicLoader } from "./loading";
import { getProgress } from "@/lib/actions/blog-progress";

export default async function Home({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data: user } = await supabase.auth.getUser();

  if (!user.user?.id) {
    redirect("/login");
  }

  return (
    <main className="space-y-10 p-16">
      <Navbar />
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Your Blogs</h1>
          <Button>
            <Link href="/blog/new" passHref>
              Create Blog
            </Link>
          </Button>
        </div>
        <Suspense
          key={search}
          fallback={
            <div className="w-full h-96 grid place-items-center">
              <ClassicLoader />
            </div>
          }
        >
          <BlogList search={search} userId={user.user.id} />
        </Suspense>
      </div>
    </main>
  );

  async function BlogList({
    search,
    userId,
  }: {
    search: string;
    userId: string;
  }) {
    const chainingsearch = supabase
      .from("blog")
      .select("*")
      .eq("createdBy", userId);

    if (search) {
      chainingsearch.textSearch("title", `*${search}*`);
    }

    const { data, error } = await chainingsearch;

    if (error) {
      console.error(error);
      return <div>Error</div>;
    }
    return (
      <div className="grid grid-cols-5 gap-10">
        {data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
}

async function BlogCard({
  blog,
}: {
  blog: Database["public"]["Tables"]["blog"]["Row"];
}) {
  const data = await getProgress(blog.id);

  return (
    <Link href={`/blog/${blog.id}`}>
      <Card className="min-h-52 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-xl line-clamp-3">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {typeof data === "number" ? (
            <div className="flex gap-2">
              <p>Progress :</p>
              <p>{parseInt(data.toString())}%</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <p>Progress :</p>
              <p>0%</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
