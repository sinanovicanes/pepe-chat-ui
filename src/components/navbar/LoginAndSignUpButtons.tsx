import { ROUTES } from "@/routes";
import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";

export const LoginAndSignUpButtons = () => {
  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Link href={ROUTES.LOGIN}>Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href={ROUTES.SIGN_UP} variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
};
