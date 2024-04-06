import { DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

export const PaymentModel = sequelize.define('payments', {
    payment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

