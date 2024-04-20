import { handleSignout } from "@/lib/actions/auth";
import { Form } from "../form";
import { Button, ButtonProps } from "../ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const Signout = async ({ children, ...props }: ButtonProps) => {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  return (
    <Form action={handleSignout}>
      <Button type="submit" {...props}>
        {children}
      </Button>
    </Form>
  );
};
