"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image } from "@nextui-org/react";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserNavbarItem } from "./UserDetails";
import { LoginAndSignUpButtons } from "./LoginAndSignUpButtons";

export const NavbarComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Navbar>
      <NavbarBrand
        className="gap-2 cursor-pointer"
        onClick={() => router.push(ROUTES.HOME)}
      >
        <Image isZoomed width={50} height={50} alt="Peepo Talk" src="peepo-talk.webp" />
        <p className="font-bold text-inherit">PEPE CHAT</p>
      </NavbarBrand>
      {status === "authenticated" ? (
        <NavbarContent justify="end">
          <UserNavbarItem />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <LoginAndSignUpButtons />
        </NavbarContent>
      )}
    </Navbar>
  );
};
