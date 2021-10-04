import { useState, useCallback } from 'react'

const useHttp = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchData = useCallback(async ({ url, ...opts }, callback) => {
		setLoading(true)
		try {
			const res = await fetch(url, opts)
			const data = await res.json()
			callback(data)
			setLoading(false)
            return data
		} catch (err) {
			setError(`Failed to fetch data: ${err}`)
			setLoading(false)
		}
	}, [])

	return {
		loading,
		error,
		fetchData
	}
}

export default useHttp
