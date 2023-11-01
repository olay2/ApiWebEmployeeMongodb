const User = require('../Models/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        const { fname, lname, email, password, phone, gender  } = req.body
        var user = await User.findOne({ fname })
        if (user) {
            return res.send('User Already Exists!!!').status(400)
        }
        // 2.Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            fname, 
            lname, 
            email, 
            password, 
            phone, 
            gender
        })
        user.password = await bcrypt.hash(password, salt)
        // 3.Save
        await user.save()
        res.status(201).json({m:'Register Success!!'})

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { email, password } = req.body
        var user = await User.findOneAndUpdate({ email }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!')
            }
            // 2. Payload
            var payload = {
                user: {
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender
                }
            }
            // 3. Generate
            jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send('User not found!!!')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}