"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { afacad } from "~/fonts/fonts";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav
      className={cn("grid h-36 w-full grid-cols-[4fr_3fr] items-center px-24 py-8", afacad.className)}
    >
      <Link className="w-max" href={"/"}>
        <Image
          className="h-14 w-auto object-contain transition-opacity duration-200 hover:opacity-50"
          src={"/flock.png"}
          alt="Flock"
          width="200"
          height="20"
        />
      </Link>

      {status === "authenticated" ? (
        <div className={"flex items-center justify-between text-lg"}>
          <Link
            className={cn(
              "transition-opacity duration-200 hover:opacity-50",
              pathname === "/dashboard" ? "opacity-50" : undefined,
            )}
            href={"/dashboard"}
          >
            Dashboard
          </Link>
          <Link
            className={cn(
              "transition-opacity duration-200 hover:opacity-50",
              pathname === "/itinerary/saved" ? "opacity-50" : undefined,
            )}
            href={"/itinerary/saved"}
          >
            Itineraries
          </Link>
          <Link
            className={cn(
              "transition-opacity duration-200 hover:opacity-50",
              pathname === "/support" ? "opacity-50" : undefined,
            )}
            href={"/support"}
          >
            Support
          </Link>

          <Popover>
            <PopoverTrigger>
              <Image
                className="w-14 rounded-full"
                src={session.user.image ?? "/avatar.png"}
                alt="Profile"
                width="100"
                height="100"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44 space-y-2 text-sm" align="end">
              <div
                className="transition-opacity duration-200 hover:cursor-pointer hover:opacity-50"
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Sign Out
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className={"flex justify-end space-x-16 text-lg"}>
          <Link
            className={cn(
              "transition-opacity duration-200 hover:opacity-50",
              pathname === "/support" ? "opacity-50" : undefined,
            )}
            href={"/support"}
          >
            Support
          </Link>
          <div
            className="transition-opacity duration-200 hover:cursor-pointer hover:opacity-50"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Log In
          </div>
        </div>
      )}
    </nav>
  );
};
