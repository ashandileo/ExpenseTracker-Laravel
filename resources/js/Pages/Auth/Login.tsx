import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/forms/LoginForm";
import type { LoginFormValues } from "./_components/forms/schema";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(values: LoginFormValues) {
    setIsLoading(true);
    router.post("/login", values, {
      onFinish: () => setIsLoading(false),
    });
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-5" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Login to your ExpenseTracker account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
