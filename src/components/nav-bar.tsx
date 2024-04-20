import { SquareMinus, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Signout } from "./auth/signout";
import { Search } from "./search";

export const Navbar = async () => {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data, error: _ } = await supabase.auth.getUser();

  return (
    <nav>
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">
            <SquareMinus />
          </Link>
        </li>
        <li>
          <Search />
        </li>
        <li>
          {!data?.user ? (
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          ) : (
            <Signout variant="ghost">Sign out</Signout>
          )}
        </li>
      </ul>
    </nav>
  );
};
