import { UserController } from "../../controllers/user.controller.js";
import express from 'express'

const router = express.Router();
const userController = new UserController()
// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    const { username, email, password, repeat_password } = req.body

    try {
        const user = await userController.register(req)
        return res.json(user)

    } catch (error) {
        return res.status(500).json({
            error: "Error al registrar el usuario",
            message: error.message
        });
    }


}
);

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body
    const token = req.headers['authorization']
    try {
        const user = await userController.login({ username, email, password });
        return res.send(user)
    } catch (error) {
        return res.status(500).json({
            error: "Error al iniciar sesión",
            message: error.message
        });
    }



});

export default router