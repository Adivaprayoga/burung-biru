import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IconHoverEffect } from "./IconHoverEffect";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { MdGrid3X3, MdHome, MdOutlineMail } from "react-icons/md";
import { SiTwitter } from "react-icons/si";
import { GrNotification } from "react-icons/gr";

import { ProfileImage } from "./ProfileImage";

export function SideNav() {
    const session = useSession()
    const user = session.data?.user;
    
    return <nav className="sticky top-0 px-2 py-4 flex flex-col justify-between h-screen">
        <ul className="flex flex-col items-start gap-4 whitespace-nowrap">
          <li>
              <Link href="/">
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <SiTwitter className="h-8 w-8 fill-sky-500" />
                  </span>
                </IconHoverEffect>
              </Link>
          </li>
          <li>
              <Link href="/">
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <MdHome className="h-8 w-8 " />
                    <span className="hidden text-lg md:inline font-bold text-black-300">Home</span> 
                  </span>
                </IconHoverEffect>
              </Link>
          </li>
          <li>
              <Link href="/">
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <MdGrid3X3 className="h-8 w-8" />
                    <span className="hidden text-lg md:inline text-black-500">Explore</span> 
                  </span>
                </IconHoverEffect>
              </Link>
          </li>
          <li>
              <Link href="/">
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <GrNotification className="h-8 w-8" />
                    <span className="hidden text-lg md:inline text-black-500">Notifications</span> 
                  </span>
                </IconHoverEffect>
              </Link>
          </li>
          <li>
              <Link href="/">
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <MdOutlineMail className="h-8 w-8" />
                    <span className="hidden text-lg md:inline text-black-500">Messages</span> 
                  </span>
                </IconHoverEffect>
              </Link>
          </li>
        </ul>

        <ul>
          { user != null && (
            <li>
              <Link href={`/profiles/${user.id}`}>
                <IconHoverEffect>
                  <span className="flex items-center gap-4">
                    <ProfileImage src={user.image} />
                    <span className="hidden md:inline">
                      <p className="text-lg text-black-700 font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </span> 
                  </span>
                </IconHoverEffect>
              </Link>
            </li>
          )}

          { user == null ? (
              <li>
                <button onClick={() => void signIn()}>
                  <IconHoverEffect>
                    <span className="flex items-center gap-4">
                      <VscSignIn className="h-5 w-5 fill-green-700" />
                      <span className="hidden text-md md:inline text-green-700">Log In</span> 
                    </span>
                  </IconHoverEffect>
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => void signOut()}>
                  <IconHoverEffect>
                    <span className="flex items-center gap-2">
                      <VscSignOut className="h-8 w-8 md:h-5 md:w-5 fill-red-700" />
                      <span className="hidden text-md md:inline text-red-700">Log Out</span> 
                    </span>
                  </IconHoverEffect>
                </button>
              </li>
            )}
        </ul>
    </nav>
}