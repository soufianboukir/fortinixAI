'use client'

import Lottie from "lottie-react";
import AnimateRobot from '@/lotties/robot-animation.json'
import { Button } from "@/components/ui/button";

function Dashboard() {
    return (
      <div>
        <div className="bg-gradient-to-b from-[#d4dfff] to-[#ffffff] dark:from-[#064ba6] dark:to-[#000000] rounded-2xl px-10 py-8 md:grid-cols-2 gap-8 items-center relative z-0 flex justify-between">
          <div className="space-y-6 w-[100%] md:w-[50%]">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold leading-tight">
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
          
          <div className=" z-10 hidden md:block">
            <Lottie animationData={AnimateRobot} loop className="lg:w-70 md:w-65 md:h-65 lg:h-70" />
          </div>
        </div>

        {/* <div className="mt-10">
          <h1 className="text-xl font-semibold">Already taked inteview by users will be showed here</h1>
        </div> */}
    </div>
    )
}


export default Dashboard