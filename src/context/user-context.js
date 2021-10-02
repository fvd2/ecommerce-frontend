import { createContext, useCallback, useEffect, useState } from 'react'

const UserContextProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(null)
	const [user, setUser] = useState({
		email: null
	})

	const handleAccessToken = useCallback(value => {
		setAccessToken(value)
	}, [])

	const handleSignIn = async (email, password) => {
		try {
			const response = await fetch('http://localhost:3020/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const tokenObject = await response.json()
			handleAccessToken(tokenObject.accessToken)
		} catch (err) {
			console.error(
				`An error occurred when registering a new user: ${err}`
			)
		}
	}

	const handleSignOut = async () => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/auth/logout/`,
				{
					method: 'POST',
					authorization: 'Bearer ' + accessToken,
					credentials: 'include'
				}
			)
			const data = await res.json()
			setUser({ email: null })
		} catch (err) {
			console.error(`Failed to log user out ${err}`)
		}
	}

	useEffect(() => {
		const fetchUserData = async accessToken => {
			const result = await fetch(
				`${process.env.REACT_APP_API_URL}/users/`,
				{
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				}
			)
			if (result.status === 401) {
				const fetchNewAccessToken = await fetch(
					`${process.env.REACT_APP_API_URL}/auth/token`,
					{
						method: 'POST',
						credentials: 'include'
					}
				)
				const updatedAccessToken = await fetchNewAccessToken.json()
				if (updatedAccessToken.accessToken) {
					handleAccessToken(updatedAccessToken.accessToken)
				} else {
					setUser({ email: null })
				}
			} else {
				const data = await result.json()
				setUser({ email: data.email })
			}
		}
		fetchUserData(accessToken)
	}, [accessToken, handleAccessToken])

	const AuthValues = {
		accessToken,
		user,
		signIn: handleSignIn,
		signOut: handleSignOut
	}

	return (
		<UserContext.Provider value={AuthValues}>
			{children}
		</UserContext.Provider>
	)
}

export const UserContext = createContext()
export default UserContextProvider
