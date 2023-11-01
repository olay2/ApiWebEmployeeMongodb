const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://node-rest-user:olay_1137@olaycluster.kdcljsm.mongodb.net/apiwebemployee')
        console.log('DB Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB