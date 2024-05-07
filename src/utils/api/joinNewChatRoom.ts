export const joinNewChatRoom = async (
  roomName: string,
  accessToken?: string
): Promise<boolean> => {
  if (!accessToken) return false;

  const response = await fetch("http://localhost:3000/api/chat/join", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ roomName }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();

  return result.success;
};
