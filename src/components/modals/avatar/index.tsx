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

interface Props {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}

export const ChangeAvatarModal: FC<Props> = ({ disclosure }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState("");

  const updateAvatar = async () => {
    if (!avatarURL) return;
    if (loading) return;

    const accessToken = session?.user.accessToken;

    if (!accessToken) return;

    setLoading(true);

    const response = await fetch("http://localhost:3000/api/users/", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify({
        avatar: avatarURL
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    alert(`Bearer ${accessToken}` + JSON.stringify(await response.json()) + response.ok);

    setLoading(false);
  };

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col">Update Avatar</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Avatar"
                placeholder="Enter your avatar URL"
                value={avatarURL}
                onValueChange={setAvatarURL}
              />
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button
                isLoading={loading}
                isDisabled={!avatarURL}
                color="primary"
                onPress={updateAvatar}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
