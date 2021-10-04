import { createContext, useCallback, useState } from 'react'

const UserContextProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(null)
	const [user, setUser] = useState({
		email: null
	})

	const handleAccessToken = useCallback(({ accessToken }) => {
		setAccessToken(accessToken)
	}, [])

	const handleUser = useCallback((userData) => {
		setUser(userData)
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