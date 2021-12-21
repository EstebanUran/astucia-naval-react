import { createContext } from "react";

export type User = {
    id: string
}

export type UserContext = {
    user: User | undefined,
    setUser: (user: User) => void;
}

const AuthContext = createContext<UserContext>({
    user: undefined,
    setUser: () => { }
});
export default AuthContext;