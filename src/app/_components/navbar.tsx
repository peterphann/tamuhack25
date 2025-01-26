"use client"

import Image from "next/image"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Afacad } from "next/font/google"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"

const afacad = Afacad({
    subsets: ['latin']
})

export const Navbar = () => {
    const {data: session, status} = useSession()

    return <nav className={"w-full h-36 px-24 py-8 grid grid-cols-[4fr_3fr] items-center " + afacad.className}>
        <Link className="w-max" href={"/"}>
            <Image className="hover:opacity-50 duration-200 transition-opacity w-auto h-14 object-contain" src={"/flock.png"} alt="Flock" width="200" height="20"/>
        </Link>

        { status === "authenticated" ?
        <div className={"flex justify-between items-center text-lg"}>
            <Link className="hover:opacity-50 duration-200 transition-opacity" href={"/dashboard"}>Dashboard</Link>
            <Link className="hover:opacity-50 duration-200 transition-opacity" href={"/itinerary/saved"}>Itineraries</Link>
            <Link className="hover:opacity-50 duration-200 transition-opacity" href={"/support"}>Support</Link>

            <Popover>
                <PopoverTrigger>
                    <Image className="w-14 rounded-full" src={session.user.image ?? "/avatar.png"} alt="Profile" width="100" height="100"/>
                </PopoverTrigger>
                <PopoverContent className="w-44 text-sm space-y-2" align="end">

                    <div className="hover:cursor-pointer hover:opacity-50 duration-200 transition-opacity" onClick={() => signOut({callbackUrl: "/", redirect: true})}>
                        Sign Out
                    </div>
                </PopoverContent>
            </Popover>
        </div>
        :
        <div className={"flex justify-end text-lg space-x-16"}>
            <Link className="hover:opacity-50 duration-200 transition-opacity" href={"/support"}>Support</Link>
            <div className="hover:cursor-pointer hover:opacity-50 duration-200 transition-opacity" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                Log In
            </div>
        </div>}
        
    </nav>
}
