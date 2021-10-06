import { createContext, useCallback, useState } from 'react'

const UserContextProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(null)
	const [user, setUser] = useState({
		email: null
	})

	const handleAccessToken = useCallback(({ accessToken }) => {
		setAccessToken(accessToken)
		return () => setAccessToken(null)
	}, [])

	const handleUser = useCallback((userData) => {
		setUser(userData)
		return () => setUser({ email: null})
	}, [])

	const authValues = {
		accessToken,
		user,
		updateUser: handleUser,
		updateAccessToken: handleAccessToken
	}

	return (
		<UserContext.Provider value={authValues}>
			{children}
		</UserContext.Provider>
	)
}

export const UserContext = createContext()
export default UserContextProvider