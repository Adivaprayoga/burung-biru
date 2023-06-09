import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IconHoverEffect } from "./IconHoverEffect";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { MdGrid3X3, MdHome, MdOutlineMail } from "react-icons/md";
import { SiTwitter } from "react-icons/si";
import { GrNotification } from "react-icons/gr";

import { ProfileImage } from "./ProfileImage";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 flex h-screen flex-col justify-between px-2 py-4">
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
                <span className="text-black-300 hidden text-lg font-bold md:inline">
                  Home
                </span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
      </ul>

      <ul>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <ProfileImage src={user.image} />
                  <span className="hidden md:inline">
                    <p className="text-black-700 text-lg font-semibold">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}

        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-5 w-5 fill-green-700" />
                  <span className="text-md hidden text-green-700 md:inline">
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect>
                <span className="flex items-center gap-2">
                  <VscSignOut className="h-8 w-8 fill-red-700 md:h-5 md:w-5" />
                  <span className="text-md hidden text-red-700 md:inline">
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
