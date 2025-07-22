import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { MoveRight } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Continue with google or enter your email
        </p>
      </div>
      <div className="grid gap-6">
        <Button variant="outline" className="w-full">
          <Image src={'/icons/google-icon.png'} width={25} height={25} alt="google icon"/>
          Login with google
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="flex gap-2">
          <Input type="email" placeholder="e.g, your.mail@example.com"/>
          <Button className="bg-white cursor-pointer border hover:bg-white/40">
            <MoveRight className="w-4 h-4 text-gray-500"/>
          </Button>
        </div>
      </div>
    </form>
  )
}
