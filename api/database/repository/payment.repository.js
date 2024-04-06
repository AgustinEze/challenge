import { Op } from "sequelize"
import { PaymentModel } from "../models/payment.model.js"
import { UserModel } from "../models/user.model.js"

export class PaymentRepository {
    async createPayment(props) {
        try {
            const user = await UserModel.findByPk(props.user_id)
            if(!user) throw new Error('El usuario no esta registrado')
            const payment = await PaymentModel.create(props)
            if (!payment) throw new Error('No se pudo crear el pago')
            return payment
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getAllPayments(props) {
        try {
            const user = await UserModel.findByPk(props.user_id)
            if(!user) throw new Error('El usuario no esta registrado')
            const payments = await PaymentModel.findAll({
                where: {
                    user_id: props.user_id
                },
                order: [['createdAt', 'DESC']]
            })
            if (!payments.length) throw new Error('No se encontraron pagos de este usuario')
            return payments
        } catch (error) {
            console.error(error)
            throw error
        }

    }
    async getPaymentById(props) {
        try {
            const user = await UserModel.findByPk(props.user_id)
            if(!user) throw new Error('El usuario no esta registrado')
            const payment = await PaymentModel.findOne({
                where: {
                    payment_id: props.payment_id,
                    user_id: props.user_id
                }
            })
            if (!payment) throw new Error('No se encontro el pago')
            return payment
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async findPayments(props) {
        try {
            const user = await UserModel.findByPk(props.user_id)
            if(!user) throw new Error('El usuario no esta registrado')
            const { user_id, order, ...filters } = props
            const payments = await PaymentModel.findAll({
                where: {
                    user_id: user_id,
                    ...(filters.receiver && {
                        receiver : filters.receiver
                    }),
                    ...(filters.reason && {
                        reason : filters.reason
                    })
                },
                ...(order && {
                    order: [['createdAt', order ?? 'DESC']]
                })
                
            })
            if (!payments.length) throw new Error('No se encontraron pagos')
            return payments
        } catch (error) {
            console.error(error)
            throw error
        }

    }
    async findPaymentsByRange(props){
        try{
            const user = await UserModel.findByPk(props.user_id)
            if(!user) throw new Error('El usuario no esta registrado')
            
            const payments = await PaymentModel.findAll({
                where:{
                    user_id: props.user_id,
                    ...(props?.receiver && {
                        receiver : props.receiver
                    }),
                    ...(props?.reason && {
                        reason : props.reason
                    }),
                    ...((props?.from || props?.to) && {
                        [props.key]: {
                          ...(props.from && props.to) && {
                            [Op.between]: [props.from, props.to]
                          },
                          ...(props.to && {
                            [Op.lte]: props.to
                          }),
                          ...(props.from && {
                            [Op.gte]: props.from
                          })
                        }
                      })
                    
                },
                ...(props?.order && {
                    order: [[props.key, props.order]]
                })
                
                
            })
            if (!payments.length) throw new Error('No se encontraron pagos')
            return payments
        }catch(error){
            console.error(error)
            throw error
        }
    }

    async searchPayments (props){
        try{
            const payments = await PaymentModel.findAll({
                where:{
                    user_id: props.user_id,
                    [Op.or]:{
                        reason:{ [Op.iLike]: `%${props.search}%`},
                        receiver: { [Op.iLike]: `%${props.search}%`},
                    }
                },order:[['createdAt', 'DESC']]
            })
            if(!payments.length) throw new Error('No se encontraron pagos')
            
            return payments
        }catch(error){
            console.error(error)
            throw error
        }
    }
}