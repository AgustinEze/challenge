import { useContext } from "react"
import { SessionContext } from "../context/SessionContext"

export const useAuth = () => {
	const { user, ...methods } = useContext(SessionContext)

	const handleUpdateUser = (props) => {
		methods.handleSetUser({
			...user,
			...props,
		})
	}

	return {
		user,
		handleUpdateUser,
		...methods,
	}
}