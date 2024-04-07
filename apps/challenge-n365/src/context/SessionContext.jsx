import { createContext } from "react";

const INITIAL_USER = {
    access_token: '',
    user_id: '',
    email: '',
    username: '',
}
export const SessionContext = createContext({
    handleSignOut: () => Promise.resolve(),
    isAuthenticated: false,
    handleInitAuth: () => Promise.resolve(),
    user: INITIAL_USER,
})