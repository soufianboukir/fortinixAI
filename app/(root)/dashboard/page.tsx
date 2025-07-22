'use client'

import Lottie from "lottie-react";
import AnimateRobot from '@/lotties/robot-animation.json'
import { Button } from "@/components/ui/button";

function Dashboard() {
    return (
      <div className="relative w-full">
        <div className="absolute right-8 z-10">
          <Lottie animationData={AnimateRobot} loop className="w-70 h-70" />
        </div>

        <div className="bg-gradient-to-b from-[#d4dfff] to-[#ffffff] dark:from-[#064ba6] dark:to-[#000000] rounded-2xl px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-0">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight">
              Get inteview ready with <span className="text-blue-500">FortinixAI </span>
              Powered practice & Feedback
            </h1>
            <p className="text-muted-foreground text-base">
              Our AI-driven platform provides realistic interview scenarios to help you build confidence, get feedback, and improve your skills.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-full bg-blue-700 px-6 py-2 text-white hover:bg-blue-700 cursor-pointer">
                Start an interview
              </Button>
              <Button className="rounded-full bg-inherit text-black px-6 py-2 dark:text-white border dark:border-white/30 border-black/30 hover:bg-inherit cursor-pointer">
                Learn more
              </Button>
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>

        <div className="mt-10">
          <h1 className="text-xl font-semibold">Already taked inteview by users will be showed here</h1>
        </div>
    </div>
    )
}


export default Dashboard