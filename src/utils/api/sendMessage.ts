export const sendMessage = async (
  roomName: string,
  message: string,
  accessToken?: string
): Promise<boolean> => {
  if (!accessToken) return false;

  const response = await fetch(`http://localhost:3000/api/message/${roomName}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();

  return result.success == undefined || result.success;
};
