import { UserRepository } from "../database/repository/user.repository.js"
import { AuthService } from "../services/auth.service.js"

const userRepository = new UserRepository()

export class UserController {
  async register(req) {
    
    const { username, email, password, repeat_password } = req.body
    try {
      if (!(username && email && password && repeat_password)) {
        throw new Error('Faltan datos')
      }
      if (password !== repeat_password) {
        throw new Error('Las contraseñas son diferentes')
      }
      const { user } = new AuthService(username, email, password)
      const newUser = await userRepository.createUser(user)
      return {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        token: newUser.token
      }
    } catch (error) {
      throw error
    }
  }

  async login({ user, password }) {
    try {
      if (!(user && password)) {
        throw new Error('Faltan datos')
      }

      const logged = await userRepository.login({ user, password })
      return {
        user_id: logged.user_id,
        username: logged.username,
        email: logged.email,
        token: logged.token,
      }
    } catch (error) {
      throw error
    }
  }
}