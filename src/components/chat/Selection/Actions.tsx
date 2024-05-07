import { VerticalDotsIcon } from "@/components/icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { FC } from "react";

export const ChatSelectionActions: FC = () => {
  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>View</DropdownItem>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
