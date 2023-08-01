require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var cors = require("cors")

const adminRoutes = require("./routes/adminRoutes")
const internRoutes = require("./routes/internRoutes")
const loginRoute = require("./routes/loginRoute")

const { authMiddleware } = require("./middlewares/authMiddleware")

const app = express()
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use(express.json({ limit: "50mb" }))
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//ROUTES
app.use("/api/interns", internRoutes)

app.use("/api/admin/login", loginRoute)

app.use("/api/admin", authMiddleware, adminRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port 4000...")
    })
  })
  .catch((error) => {
    console.log(error)
  })
