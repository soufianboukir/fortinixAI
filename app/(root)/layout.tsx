'use client'

import { ModeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()

    return (
        <>
            <SidebarInset>
                <header className="flex h-16 shrink-0 justify-between lg:justify-between px-4 items-center gap-2 border-b border-b-black/20 dark:border-b-white/20">
                    <div className='flex gap-2 items-center font-mono font-semibold'>
                        FortinixAI
                    </div>
                    <div className="flex items-center gap-4">
                        <LogOut onClick={() => signOut()} className='cursor-pointer'/>
                        <ModeToggle />
                        <Avatar className='w-10 h-10'>
                            {session?.user.image && <AvatarImage src={session?.user.image} />}
                            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </>
    )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex md:mx-20 border-l dark:border-l-white/20 border-l-black/20 border-r border-r-black/20 dark:border-r-white/20'>
      <SidebarProvider>
        <LayoutContent>
            {children}
        </LayoutContent>
      </SidebarProvider>
    </div>
  )
}
