import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IconHoverEffect } from "./IconHoverEffect";
import { MdHome } from "react-icons/md";
import { SiTwitter } from "react-icons/si";
import { ProfileImage } from "./ProfileImage";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 flex h-screen flex-col justify-between px-2 py-2">
      <ul className="flex flex-col items-start gap-4 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect className="mx-2 px-2 py-2">
              <span className="flex items-center gap-4">
                <SiTwitter className="h-8 w-8 fill-sky-500" />
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {session.status === "authenticated" && (
          <li>
            <Link href="/">
              <IconHoverEffect className="mx-2 px-2 py-2 md:mx-0 md:px-4 md:py-2">
                <span className="flex items-center gap-4">
                  <MdHome className="h-8 w-8 " />
                  <span className="text-black-300 hidden text-lg font-bold md:inline">
                    Home
                  </span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
      </ul>

      <ul>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconHoverEffect className="px-2 py-2">
                <span className="flex items-center gap-4">
                  <ProfileImage src={user.image} width={50} height={50} />
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
        {user != null && (
          <li>
            <button onClick={() => void signOut()}>Log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
