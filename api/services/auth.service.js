import crypto from 'crypto'
import { JWT } from './jwt.service.js'

export class AuthService {
  user

  constructor(username, email, password){
    this.user = this.#parseData(username, email, password)
  }
  
  static encryptPassword(password, salt) {
    console.log('pass', password)
    console.log('salt', salt)
		return crypto
    .createHash('RSA-SHA256')
    .update(password)
    .update(salt)
    .digest('hex')
	}
  static validatePassword (model, password){
    const hashedPassword = AuthService.encryptPassword(password, model.user_salt)
    return model.password === hashedPassword
  }
  
  #generateUserSalt() {
    return crypto.randomBytes(16).toString('base64')
  }

  #generateToken (payload){
    return JWT.sign(payload)
  }

  #parseData(username, email, password) {

    const userSalt = this.#generateUserSalt();
    const hashedPassword = AuthService.encryptPassword(password, userSalt)
    const token = this.#generateToken({username, email})
 
    return {
      username, 
      email, 
      password: hashedPassword,
      user_salt: userSalt,
      token
    };
  }

}

