import { IUser } from "@/app/_layout";
import { createContext } from "react";

interface IAuthContext {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser>> | null
}
export const AuthContext = createContext<IAuthContext>({user: null, setUser: null});