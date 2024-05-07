export const fetchChatrooms = async (accessToken?: string) => {
  if (!accessToken) return [];

  const response = await fetch("http://localhost:3000/api/users/chats", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.log("Failed to fetch");
    return [];
  }

  const rooms = await response.json();

  return rooms;
};
