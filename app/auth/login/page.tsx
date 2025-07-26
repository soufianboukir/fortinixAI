"use client";

import { LoginForm } from "@/components/login-form";
import Lottie from "lottie-react";
import Link from "next/link";
import AnimatedData from "@/lotties/login-page-animation.json";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="" className="flex items-center gap-2 font-semibold font-mono">
            <span>FortinixAI</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[100%] rounded-md border px-6 py-12 shadow-md md:max-w-md">
            <LoginForm />
            <br />
            <p className="text-xs dark:text-white/50 text-black/50 text-center">
              By clicking continue, you agree to our{" "}
              <Link href={"/terms-of-service"} className="underline">
                Terms of Service
              </Link>{" "}.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden items-center justify-center lg:flex">
        <Lottie animationData={AnimatedData} loop={true} />
      </div>
    </div>
  );
}
