import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SquareMinus } from "lucide-react";
import { Form, FormButton } from "@/components/form";
import { handleLogin } from "@/lib/actions/auth";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="flex h-screen items-center justify-center py-12">
        <Form action={handleLogin} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required name="password" />
            </div>

            <FormButton className="w-full">Login</FormButton>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
          <div className="grid place-items-center w-full h-full">
            <SquareMinus className="w-20 h-20" />
          </div>
        </div>
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
