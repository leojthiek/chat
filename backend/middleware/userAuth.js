const jwt = require('jsonwebtoken')
const User = require('../model/user')

const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, "jshdjhfdskfj")
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      .json("not authorised,token failed")
    }
  }
  if (!token) {
    res.status(401)
    .json("not authorise,no token")
  }
}

const admin = (req, res, next) => {
  if (req.user.admin) {
    next()
  } else {
    res.status(401)
    throw new Error("not authorised as an admin")
  }
}
module.exports =  { protect, admin }
