export const getChatMessages = async (
  roomName: string,
  accessToken?: string
): Promise<UserMessage[]> => {
  if (!accessToken) return [];

  const response = await fetch(`http://localhost:3000/api/message/${roomName}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    return [];
  }

  const result = await response.json();

  return result ?? [];
};
