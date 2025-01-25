"use client"

import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Afacad } from "next/font/google"

const afacad = Afacad({
    subsets: ['latin']
})

export const Navbar = () => {
    
    return <nav className={"w-full h-36 px-24 py-8 grid grid-cols-2 items-center " + afacad.className}>
        <Link className="w-max" href={"/"}>
            <Image className="hover:opacity-50 duration-200 transition-opacity w-auto h-14 object-contain" src={"/flock.png"} alt="Flock" width="200" height="20"/>
        </Link>

        <div className={"flex justify-end text-lg"}>
            <div className="hover:cursor-pointer hover:opacity-50 duration-200 transition-opacity" onClick={() => signIn("google", { callbackUrl: "/" })}>
                Log In
            </div>
        </div>
    </nav>
}