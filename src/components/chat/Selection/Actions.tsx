import { VerticalDotsIcon } from "@/components/icons";
import { leaveFromChatRoom } from "@/utils/api";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface Props {
  roomName: string;
}

export const ChatSelectionActions: FC<Props> = ({ roomName }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const leave = async () => {
    if (loading) return;

    setLoading(true);

    await leaveFromChatRoom(roomName, session?.user.accessToken);
    window.location.reload();
    setLoading(false);
  };

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="view" onPress={() => router.push(`/chat/${roomName}`)}>
            View
          </DropdownItem>
          <DropdownItem key="delete" onPress={leave}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
