"use client";
import { ROUTES } from "@/routes";
import { NavbarItem } from "@nextui-org/navbar";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  useDisclosure
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { ChangeAvatarModal } from "../modals/avatar";

export const UserNavbarItem = () => {
  const { data: session, status } = useSession();
  const avatarModal = useDisclosure();

  return (
    <NavbarItem>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={session?.user.avatar}
            name={session?.user.username}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session?.user.username}</p>
          </DropdownItem>
          <DropdownItem key="change_avatar" onPress={avatarModal.onOpen}>
            Change Avatar
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() =>
              signOut({
                redirect: true
              })
            }
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ChangeAvatarModal disclosure={avatarModal} />
    </NavbarItem>
  );
};
