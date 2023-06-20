import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/Button";

const AuthCheck = () => {
  const session = useSession();
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <>
      {session.status === "unauthenticated" && (
        <div className="sticky bottom-0 bg-sky-500">
          <div className="align-items container mx-auto flex items-center justify-around p-4">
            <div>
              <h1 className="text-xl font-bold text-white">
                Don’t miss what’s happening
              </h1>
              <p className="text-white">
                People on Twitter are the first to know.
              </p>
            </div>
            <div>
              <Button onClick={handleGithubSignin}>Log in</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthCheck;
