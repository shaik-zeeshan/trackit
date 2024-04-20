import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SquareMinus } from "lucide-react";
import { Form, FormButton } from "@/components/form";
import { handleSignUp } from "@/lib/actions/auth";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <div className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
          <div className="grid place-items-center w-full h-full">
            <SquareMinus className="w-20 h-20" />
          </div>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center py-12">
        <Form action={handleSignUp} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required name="password" />
            </div>

            <FormButton className="w-full">Sign up</FormButton>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="w-full h-full">
      <Dashboard />
    </div>
  );
}
