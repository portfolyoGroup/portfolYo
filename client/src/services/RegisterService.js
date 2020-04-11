import { Post } from './ServerService'

export const register = async (firstName, lastName, email, password) => {
    const response = await Post('/register', { firstName, lastName, email, password })
    // analyze status codes 
}