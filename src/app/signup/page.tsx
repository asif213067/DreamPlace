"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleEmailSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSigningUp || isGoogleLoading) return;

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") || "");
    const image = String(formData.get("image") || "").trim();

    // Basic frontend validation
    if (name.length < 2 || name.length > 80) {
      toast.error("Name must be between 2 and 80 characters.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      toast.error("Password must be between 8 and 128 characters.");
      return;
    }

    if (image && !/^https?:\/\/.+/i.test(image)) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    setIsSigningUp(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/home",
      });

      if (error) {
        toast.error(error.message || "Unable to create your account.");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");

        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (isSigningUp || isGoogleLoading) return;

    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google signup failed.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Unable to continue with Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Create an Account
            </CardTitle>

            <CardDescription>
              Join DreamPlace and start exploring your next destination.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleEmailSignUp} className="grid gap-4">
              <FieldGroup>
                {/* Google Signup */}
                <Field>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={isSigningUp || isGoogleLoading}
                    className="w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>

                    {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with email
                </FieldSeparator>

                {/* Name */}
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    required
                    disabled={isSigningUp || isGoogleLoading}
                  />
                </Field>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={isSigningUp || isGoogleLoading}
                  />
                </Field>

                {/* Profile Image */}
                <Field>
                  <FieldLabel htmlFor="image">
                    Profile Image (Optional)
                  </FieldLabel>
                  <Input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    autoComplete="url"
                    disabled={isSigningUp || isGoogleLoading}
                  />
                  <FieldDescription>
                    You can add your profile image later.
                  </FieldDescription>
                </Field>

                {/* Password */}
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    disabled={isSigningUp || isGoogleLoading}
                  />
                  <FieldDescription>
                    Use at least 8 characters for your password.
                  </FieldDescription>
                </Field>

                {/* Submit */}
                <Field>
                  <Button
                    type="submit"
                    disabled={isSigningUp || isGoogleLoading}
                    className="w-full bg-[#0aa3bd] text-white hover:bg-[#078ba2] disabled:opacity-60"
                  >
                    {isSigningUp ? "Creating Account..." : "Create Account"}
                  </Button>

                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#0aa3bd] hover:underline"
                    >
                      Login
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <FieldDescription className="mt-5 px-4 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </FieldDescription>
      </div>
    </div>
  );
}
