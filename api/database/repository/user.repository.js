import { Op } from "sequelize"
import { UserModel } from "../models/user.model.js"
import { AuthService } from "../../services/auth.service.js"

export class UserRepository {
    async createUser(props) {
        try {
            let user = await UserModel.findOne({
                where: {
                    [Op.or]: [{
                        username: props.username
                    }, {
                        email: props.email
                    }]
                }
            })
            if (user) {
                throw new Error('El usuario o el email ya estan registrados')
            }

            return await UserModel.create(props)

        } catch (error) {
            console.error(error)
            throw error
        }

    }
    async login(props) {
        try {
            const user = await UserModel.findOne({
                where: {
                    ...(props?.email && { email: props?.email }
                    ),
                    ...(props?.username && { username: props?.username }
                    )
                }
            })
            if (!user) {
                throw new Error('El usuario no existe')
            }

            if (!AuthService.validatePassword(user, props.password))
                throw new Error('Contraseña, usuario o mail incorrecto')
            return user
        } catch (error) {
            console.error(error)
            throw error
        }

    }

}