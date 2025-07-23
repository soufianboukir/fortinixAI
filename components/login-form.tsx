import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader, MoveRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState({ google: false, email: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading({ google: false, email: true });
    try {
      const res = await signIn("email", { email, redirect: false, callbackUrl: "/dashboard" });
      if (!res?.error && res?.status === 200) {
        setSuccess(true);
      }
    } catch {
        setError("An error occured. try again");
    } finally {
      setLoading({ google: false, email: false });
    }
  };

  const handleAuthWithGoogle = async () => {
    setLoading({ google: true, email: false });
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading({ google: false, email: false });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Continue with google or enter your email
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
          disabled={loading.google}
          onClick={handleAuthWithGoogle}
        >
          {loading.google ? (
            <Loader className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <Image src={"/icons/google-icon.png"} width={25} height={25} alt="google icon" />
          )}
          Login with google
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="e.g, your.mail@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              variant="outline"
              className="cursor-pointer border hover:bg-white/40"
              disabled={!email || loading.email}
              type="submit"
            >
              {loading.email ? (
                <Loader className="h-4 w-4 animate-spin text-gray-500" />
              ) : (
                <MoveRight className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
          {success && (
            <p className="mt-3 text-sm text-green-600">
              A magic link sent to <span className="font-medium">{email}</span>, check it
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
