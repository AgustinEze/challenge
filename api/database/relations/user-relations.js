import {  UserModel } from "../models/User"
import {PaymentModel} from '../models/Payment'

UserModel.hasMany(PaymentModel, { 
    as: 'payments', 
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})
PaymentModel.belongsTo(UserModel, { 
    as: 'user', 
    foreignKey: 'user_id',
    targetKey: 'user_id'
 })