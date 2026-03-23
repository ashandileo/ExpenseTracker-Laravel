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
import { RegisterForm } from "./_components/forms/RegisterForm";
import type { RegisterFormValues } from "./_components/forms/schema";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    router.post("/register", values, {
      onFinish: () => setIsLoading(false),
    });
  }

  return (
    <>
      <Head title="Register" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-5" />
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Get started with ExpenseTracker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
