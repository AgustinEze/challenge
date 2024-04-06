import { UserRepository } from "../database/repository/user.repository.js";
import { AuthService } from "../services/auth.service.js";

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
      const newUser = await userRepository.createUser(user);
      return {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        token: newUser.token
      }
    } catch (error) {
      throw error
    }
  };

  async login({ username, email, password }) {
    try {
      if (!((username || email) && password)) {
        throw new Error('Faltan datos')
      }

      const user = await userRepository.login({ username, email, password });
      return {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        token: user.token,
      }
    } catch (error) {
      throw error
    }
  };
}