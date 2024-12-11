"use client";

import React from "react";
// import { Component } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@react-email/components"; 




const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as { email?: string; username?: string }; // Extend `User` type if needed

  return (
    <nav className="p-4 md:p-6 shadow-md flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Mystery Message
      </Link>
      <div>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email || "User"}
            </span>
            <Button
              className="w-full md:w-auto"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;



