const bcrypt = require("bcrypt")
const validate = require("validator")

const User = require("../model/user")
const generateToken = require("../utils/generateJWT")

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!validate.isEmail(email)) {
      return res.status(400).json({ error: "invalid email format" })
    }

    const emailExists = await User.findOne({ email: email })
    const nameExists = await User.findOne({ name: name })

    if (emailExists) {
      return res.status(400).json({ error: "email already exists" })
    }

    if (nameExists) {
      return res.status(400).json({ error: "name already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    res.status(201).json({message:"Register successfull"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error occurred while registering"})
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ error: "email does not exist" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ error: "invalid password" })
    }

    const token = generateToken(user._id)

    const userWithToken = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    }

    res.status(200).json({user:userWithToken})
  } catch (error) {
    console.log(error)
    res.status(500).json("Internal server error occurred while logging in")
  }
}

module.exports = { login, register }
