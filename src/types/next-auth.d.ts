import { type DefaultSession, type DefaultJWT  } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  //interface Session {
    //user?: {
      //id: string;
    //} & DefaultSession["user"];
  //}
    //interface JWT {
        //isAdmin?: boolean | null;
    //} DefaultJWT

    interface User {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    }
  interface Session {
    user: User,
    expires: ISODateString
  }
}
