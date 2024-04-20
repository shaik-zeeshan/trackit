import { readFromURL } from "@/lib/converter";

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { typographConfig } from "@/components/ui/typography";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import Link from "next/link";
import { ScrollProgress } from "@/components/framer-motion/scroll-progress";
import { ProgressTracker } from "@/components/progress-tracker";

export default async function Home({
    params: { id },
}: {
    params: { id: string };
}) {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.from("blog").select("*").eq("id", id);

    if (error) {
        return <div>Error</div>;
    }

    if (!data[0]) return;

    const { blog_url } = data[0];

    if (!blog_url) return;

    return (
        <main className="h-full lg:w-1/2 md:w-2/3 w-full space-y-2 mx-auto">
            <ScrollProgress />
            <div className="flex gap-2 items-center">
                <div>Content of</div>
                <Link className="font-mono" href={blog_url}>
                    {new URL(blog_url).hostname}
                </Link>
            </div>
            <MarkdownURL blog_url={blog_url!} />
            <ProgressTracker />
        </main>
    );
}

const MarkdownURL = async ({ blog_url }: { blog_url: string }) => {
    const mdx = await readFromURL(blog_url!);

    return (
        <div>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    ...typographConfig,
                }}
            >
                {mdx}
            </Markdown>
        </div>
    );
};
