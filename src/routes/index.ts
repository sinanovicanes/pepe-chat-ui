export enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  CHAT = "/chat"
}

export const PROTECTED_ROUTES = [ROUTES.HOME, ROUTES.CHAT];
