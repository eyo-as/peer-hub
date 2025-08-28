import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
