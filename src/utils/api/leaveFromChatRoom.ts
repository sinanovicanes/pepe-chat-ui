export const leaveFromChatRoom = async (
  name: string,
  accessToken?: string
): Promise<boolean> => {
  if (!accessToken) return false;

  const response = await fetch(`http://localhost:3000/api/chat/leave/${name}`, {
    method: "POST",
    mode: "cors",
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
