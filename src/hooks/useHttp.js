import { useCallback, useEffect, useRef, useState } from 'react'

const useHttp = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const mountedRef = useRef(true)

	const execute = useCallback(async ({ url, ...opts }, callback) => {
			setLoading(true)
			try {
				const res = await fetch(url, opts)
				const data = await res.json()
				if (mountedRef.current) {
					callback(data)
					setLoading(false)
				} else {
					
					return null
				}
				return data
			} catch (err) {
				setError(`Failed to fetch data: ${err}`)
				setLoading(false)
			}
	}, [])

	useEffect(() => {
		return () => mountedRef.current = false
	}, [])

	return {
		loading,
		error,
		fetchData: execute
	}
}

export default useHttp
