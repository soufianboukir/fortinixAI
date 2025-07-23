'use client'

import Lottie from 'lottie-react'
import React from 'react'
import AiBot from '@/lotties/ai-bot.json'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
const NewInterview = () => {
    const { data: session } = useSession()
    return (
        <div>
            <div>
                <h1 className='text-3xl font-semibold'>Interview generation</h1>
            </div>

            <div className='mt-10 flex gap-2'>
                <div className='bg-gradient-to-b dark:from-blue-950 dark:to-black from-blue-300 to-white rounded-md w-[50%] text-center py-10'>
                    <div className='relative w-fit mx-auto'>
                        <span className='absolute inset-0 w-20 h-20 top-6 rounded-full bg-blue-400 dark:bg-blue-800 animate-ping z-0 mx-auto' />
                        <Lottie animationData={AiBot} loop={true} className='w-40 h-40 relative z-10' />
                    </div>
                        <h1 className='text-2xl font-semibold dark:text-white'>FortinixAI</h1>
                </div>

                <div className='bg-gradient-to-b dark:from-muted dark:to-black from-muted to-white rounded-md w-[50%] text-center py-10'>
                    <div className='relative w-fit mx-auto'>
                        <span className='absolute inset-0 w-20 h-20 top-6 rounded-full bg-blue-400 dark:bg-blue-800 z-0 mx-auto' />
                        <Avatar className='w-40 h-40'>
                            {
                                session?.user.image && <AvatarImage src={session?.user.image} />
                            }
                            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                        <h1 className='text-2xl font-semibold dark:text-white'>You</h1>
                </div>
            </div>

            <div className='rounded-md px-4 py-2 mt-4 font-medium text-sm w-[70%] mx-auto text-center'>
                <p>This is executed at the top level of your RootLayout component — but at that moment, the component is not yet wrapped inside the. So React throws the context error.</p>
            </div>

            <div className='text-center mt-3'>
                <Button className='bg-red-600 px-5 text-white hover:bg-red-700 cursor-pointer py-2 rounded-full'>
                    End call
                </Button>
            </div>
        </div>
    )
}


export default NewInterview;