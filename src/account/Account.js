import { useContext } from 'react'
import { UserContext } from '../context/user-context'

const Account = () => {
    const userCtx = useContext(UserContext)
    return userCtx.user.email
}

export default Account