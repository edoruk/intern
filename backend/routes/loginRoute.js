const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const admin = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
}

const router = express.Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body

  if (username !== admin.username || password !== admin.password) {
    return res.status(401).json({ message: "Invalid credentials" })
  }
  //generate token and send back to client side for authorization header in subsequent requests
  const accessToken = jwt.sign(
    { username: admin.username, password: admin.password },
    process.env.JWT_SECRET
  )
  return res.status(200).json(accessToken)
})

module.exports = router
