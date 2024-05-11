import { createChatRoom } from "@/utils/api";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";

interface DisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

interface Props {
  disclosure: DisclosureProps;
}

export const CreateRoomModal: FC<Props> = ({ disclosure }) => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const createRoom = async () => {
    if (loading) return;
    if (!roomName) return;

    setLoading(true);
    const success = await createChatRoom(roomName, session?.user.accessToken);
    setLoading(false);

    if (success) return window.location.reload();
  };

  return (
    <>
      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col">Create Room</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Room Name"
                  placeholder="Enter room name"
                  value={roomName}
                  onValueChange={setRoomName}
                />
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  isLoading={loading}
                  isDisabled={!roomName}
                  color="primary"
                  onPress={createRoom}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
