
import { PaymentRepository } from "../database/repository/payment.repository.js"

const paymentRepository = new PaymentRepository()

export class PaymentController {
  async createPayment(req) {
    const { user_id,
      date,
      amount,
      reason,
      receiver,
    } = req.body

    try {
      if (!(user_id && date && amount && reason && receiver)) {
        throw new Error('Faltan datos')
      }
      if(typeof amount !== 'number') throw new Error('Monto invalido')
      return await paymentRepository.createPayment({
        user_id,
        date,
        amount,
        reason,
        receiver,
      })

    } catch (error) {
      throw error
    }
  }

  async getAllPayments(req) {
    const { user_id } = req.params
    if (!user_id) throw new Error('Faltan datos')

    const {
      key, from, to, reason, receiver, order, search
    } = req.query

    let filters = {
      ...(key && { key }),
      ...(from && { from }),
      ...(to && { to }),
      ...(reason && { reason }),
      ...(receiver && { receiver }),
      ...(order && { order }),
      ...(search && {search }),
    }
    const hasFilters = Object.values(filters)
    try {
      if (hasFilters.length) {
        if(filters.search) return await paymentRepository.searchPayments({user_id, ...filters})
        if (filters.key) return await paymentRepository.findPaymentsByRange({ user_id, ...filters })
        return await paymentRepository.findPayments({ user_id, ...filters })
      }
      return await paymentRepository.getAllPayments({ user_id })
    } catch (error) {
      throw error
    }
  }

  async getPaymentById(req) {
    const { payment_id, user_id } = req.params
    try {
      return await paymentRepository.getPaymentById({ payment_id, user_id })

    } catch (error) {
      throw error
    }
  }

}
