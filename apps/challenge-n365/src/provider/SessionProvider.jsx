import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { SessionContext } from "../context/SessionContext.jsx"

const BACKEND_URL = 'http://localhost:3000'

const INITIAL_USER = {
    access_token: '',
    user_id: '',
    email: '',
    username: '',
}
export const SessionProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [user, setUser] = useState(INITIAL_USER)
    const [loading , setLoading] = useState(false)
    const handleInitAuth = async () => {
        try {
            const token = Cookies.get('challenge.token')
            if (!token){ 
                throw new Error('No hay sesion')
        }
            const user = await fetch(`${BACKEND_URL}/user/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }),
            })
            const logged = await user.json()
            setUser(logged)
            setIsAuthenticated(true)
        } catch (error) {
            handleSignOut()
        }finally {
			setLoading(false)
		}
    }

    const handleSignOut = async () => {
        Cookies.remove('challenge.token')
        setIsAuthenticated(false)
        setUser(INITIAL_USER)
    }

    useEffect(() => {
        handleInitAuth()
    }, [])

    return (
        <SessionContext.Provider
            value={{
                isAuthenticated,
                handleSignOut,
                handleInitAuth,
                user,
            }}
        >
            {!loading && children}
        </SessionContext.Provider>
    )
}