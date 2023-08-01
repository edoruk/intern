const express = require("express")

const { createIntern } = require("../controllers/internController")

const router = express.Router()

router.post("/", createIntern)

module.exports = router
