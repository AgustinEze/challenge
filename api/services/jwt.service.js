import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

const JWT_SECRET = 'challenge'

export class JWT {
    static verify(token){
        return jwt.verify(token, JWT_SECRET)
    }
    static decode(token){
        return jwt.decode(token)
    }

    static sign (payload){
        const expired_token = dayjs().add(8, 'hour').valueOf()
		return jwt.sign({ ...payload, expired_token }, JWT_SECRET, {
			expiresIn: '8h',
			algorithm: 'HS256',
			mutatePayload: false,
		})
    }

}