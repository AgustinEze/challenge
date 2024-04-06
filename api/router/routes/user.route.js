import { UserController } from "../../controllers/user.controller.js"
import express from 'express'

const router = express.Router()
const userController = new UserController()
// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    try {
        const user = await userController.register(req)
        return res.json(user)

    } catch (error) {
        return res.status(500).json({
            error: "Error al registrar el usuario",
            message: error.message
        })
    }


}
)

router.post('/login', async (req, res) => {
    const { user, password } = req.body
    try {
        const logged = await userController.login({ user, password })
        return res.send(logged)
    } catch (error) {
        return res.status(500).json({
            error: "Error al iniciar sesión",
            message: error.message
        })
    }



})

export default router