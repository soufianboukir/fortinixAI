'use client'

import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const { isMobile } = useSidebar()

    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 justify-between lg:justify-end px-4 items-center gap-2 border-b border-b-black/20 dark:border-b-white/20">
                    {isMobile && <SidebarTrigger className="-ml-1" />}
                    <div className="flex items-center gap-4">
                        <LogOut onClick={() => signOut()} className='cursor-pointer'/>
                        <ModeToggle />
                        <Avatar className='w-10 h-10'>
                            {session?.user.image && <AvatarImage src={session?.user.image} />}
                            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-6">
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
