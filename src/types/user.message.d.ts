interface UserMessage extends Omit<User, "id"> {
  id: string;
  message: string;
  date: number;
}
